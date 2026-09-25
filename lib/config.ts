export const config = {
  company: process.env.NEXT_PUBLIC_COMPANY_NAME || "Quay",
  tagline: process.env.NEXT_PUBLIC_TAGLINE || "You paid. Here is the door.",
  owner: process.env.NEXT_PUBLIC_OWNER_NAME || "Legal Owner",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "owner@example.com",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  storefrontUrl:
    process.env.NEXT_PUBLIC_STOREFRONT_URL ||
    "https://aurora-autonomous-commerce.vercel.app",
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
  priorityPrice: Number(process.env.NEXT_PUBLIC_PRIORITY_PRICE || 9),
  unlockSecret: process.env.UNLOCK_SECRET || "change-me-to-a-long-random-string",
};

export function isLivePayments() {
  return (
    process.env.NEXT_PUBLIC_DEMO_MODE === "false" &&
    Boolean(process.env.STRIPE_SECRET_KEY)
  );
}
