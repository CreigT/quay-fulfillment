import { createHmac } from "crypto";
import { config } from "./config";

export type Entitlement = {
  email: string;
  packId: string;
  source: "demo" | "stripe";
  grantedAt: string;
};

function sign(payload: string) {
  return createHmac("sha256", config.unlockSecret).update(payload).digest("hex");
}

export function issueToken(ent: Entitlement) {
  const body = Buffer.from(JSON.stringify(ent)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function readToken(token: string | undefined | null): Entitlement | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  if (sign(body) !== sig) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!data.email || !data.packId) return null;
    return data as Entitlement;
  } catch {
    return null;
  }
}

export function cookieName() {
  return "quay_unlock";
}
