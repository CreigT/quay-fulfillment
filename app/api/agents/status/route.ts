import { NextResponse } from "next/server";
import agents from "@/data/agents.json";
import { config } from "@/lib/config";

export function GET() {
  return NextResponse.json({
    module: "quay-fulfillment",
    demoMode: config.demoMode,
    agents,
  });
}
