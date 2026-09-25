import { NextRequest, NextResponse } from "next/server";
import { cookieName, issueToken } from "@/lib/token";
import { getPack } from "@/lib/packs";
import { isLivePayments } from "@/lib/config";
import { publish } from "@/lib/events";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const packId = String(body.packId || "");
  const pack = getPack(packId);
  if (!email || !email.includes("@") || !pack) {
    return NextResponse.json({ error: "Need a real email and pack." }, { status: 400 });
  }
  if (isLivePayments() && body.source === "demo") {
    return NextResponse.json(
      { error: "Live mode only unlocks after Stripe payment." },
      { status: 402 }
    );
  }
  const token = issueToken({
    email,
    packId,
    source: isLivePayments() ? "stripe" : "demo",
    grantedAt: new Date().toISOString(),
  });
  publish("entitlement.granted", "entitlement", `${packId} for ${email}`);
  const res = NextResponse.json({ ok: true, token });
  res.cookies.set(cookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
