import { NextRequest, NextResponse } from "next/server";
import { readToken } from "@/lib/token";

export function GET(req: NextRequest) {
  const token =
    req.nextUrl.searchParams.get("token") ||
    req.cookies.get("quay_unlock")?.value;
  const ent = readToken(token);
  if (!ent) {
    return NextResponse.json({ ok: false, entitlement: null }, { status: 404 });
  }
  return NextResponse.json({ ok: true, entitlement: ent });
}
