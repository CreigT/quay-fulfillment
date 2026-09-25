import { NextResponse } from "next/server";
import { config, isLivePayments } from "@/lib/config";

export function GET() {
  return NextResponse.json({
    ok: true,
    module: "quay-fulfillment",
    company: config.company,
    demoMode: config.demoMode,
    livePayments: isLivePayments(),
    time: new Date().toISOString(),
  });
}
