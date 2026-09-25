import { NextRequest, NextResponse } from "next/server";
import { config, isLivePayments } from "@/lib/config";
import { getPack } from "@/lib/packs";
import { issueToken } from "@/lib/token";
import { getStripe } from "@/lib/stripe";
import { publish } from "@/lib/events";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const packId = String(body.packId || "priority");
  const pack = getPack(packId);
  if (!email || !email.includes("@") || !pack) {
    return NextResponse.json({ error: "Need a real email and pack." }, { status: 400 });
  }

  publish("checkout.started", "sales", `${packId} ${email}`);

  if (!isLivePayments()) {
    const token = issueToken({
      email,
      packId,
      source: "demo",
      grantedAt: new Date().toISOString(),
    });
    publish("checkout.completed", "sales", `demo ${packId}`);
    return NextResponse.json({
      ok: true,
      mode: "demo",
      url: `${config.baseUrl}/deliver/${token}`,
    });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    success_url: `${config.baseUrl}/unlock?paid=1`,
    cancel_url: `${config.baseUrl}/priority`,
    metadata: { packId, email },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(pack.price * 100),
          product_data: { name: pack.name },
        },
      },
    ],
  });

  return NextResponse.json({ ok: true, mode: "live", url: session.url });
}
