import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { issueToken } from "@/lib/token";
import { publish } from "@/lib/events";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }
  const raw = await req.text();
  const sig = req.headers.get("stripe-signature") || "";
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch {
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      customer_email?: string;
      metadata?: { packId?: string; email?: string };
    };
    const email = session.metadata?.email || session.customer_email || "";
    const packId = session.metadata?.packId || "priority";
    const token = issueToken({
      email,
      packId,
      source: "stripe",
      grantedAt: new Date().toISOString(),
    });
    publish("order.paid", "fulfillment", `${packId} ${email}`);
    return NextResponse.json({ ok: true, token });
  }
  return NextResponse.json({ ok: true });
}
