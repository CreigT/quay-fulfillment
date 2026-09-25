# Day 2 Module — Digital Fulfillment & Entitlement Agent

Date: 2026-09-25
Code name: Quay
Status: Production-ready for Vercel

See README.md for deploy steps. This file is the engineering contract.

1. Module Name: Digital Fulfillment & Entitlement Agent (`quay-fulfillment`)
2. Purpose: After a customer pays on the Day 1 storefront, this module issues a signed entitlement and hands over the files through pages a person can read.
3. Business Value: A sale that cannot be delivered is not revenue. This module closes the loop without making the owner the shipping clerk. The $9 Priority Locker is a second, honest offer.
4. Agent Responsibilities: Fulfillment Agent issues unlocks and serves files. Entitlement Agent signs and verifies HMAC tokens. Sales Agent sells only the $9 add-on. Refund Agent collects requests and does not move money. Governance Agent blocks subscriptions and hidden prices. Risk Agent keeps demo mode on until keys exist. Monitoring Agent serves `/api/health`. CEO Agent watches events.
5. Inputs: env vars, `data/packs.json`, buyer email, pack id, optional Stripe webhook, tokens from cookies or URLs, storefront URL.
6. Outputs: pages `/`, `/unlock`, `/locker`, `/priority`, `/deliver/:token`, `/refund`, `/legal`, `/status`. Events: `checkout.started`, `checkout.completed`, `entitlement.granted`, `order.paid`. Files under `/packs`.
7. APIs Required: outbound Stripe Checkout + Webhooks. Inbound GET `/api/health`, POST `/api/fulfill`, GET `/api/entitlements`, POST `/api/checkout`, POST `/api/webhook`, GET `/api/events`, GET `/api/agents/status`.
8. MCP Tools Required: none required today. GitHub + Vercel are the human deploy path.
9. Databases Required: none. Signed tokens are the entitlement store. In-process event ring. Pack catalog is JSON in the repo.
10. Memory Requirements: 200-event ring, pack JSON, 30-day HttpOnly unlock cookie, token in the delivery URL.
11. Security Controls: `UNLOCK_SECRET` only on the server. HMAC-SHA256 tokens. HttpOnly cookie. Stripe webhook signatures. No admin money UI. Demo default. Live unlock from the public form is refused when demo is off.
12. Failure Recovery Strategy: bad token → 404. Bad webhook signature → 400 and no grant. Stripe missing in live mode → 500 on checkout, previous Vercel release stays up. Refund never auto-fires. Redeploy rolls forward; Vercel rollback is the backstop.
13. Agent-to-Agent Communications: JSON events only. Storefront agents may call `/api/entitlements?token=`. This module does not write into Aurora's process. Refund Agent emails the owner address from env.
14. Workflow Diagram (text):
    Visitor → landing → unlock (email + pack) → POST /api/fulfill → signed token → /deliver/token → download
    Visitor → /priority → POST /api/checkout → demo token URL or Stripe → webhook order.paid → owner-approved refund path if needed
    Owner → edit env → git push → Vercel
15. Data Flow: packs.json → locker pages and price. env → config. email+pack → token. token → delivery page + entitlements API. Stripe session metadata → webhook → order.paid event.
16. Decision Logic: live payments only if `STRIPE_SECRET_KEY` exists AND `NEXT_PUBLIC_DEMO_MODE=false`. Demo fulfill is rejected in live mode. Price of priority pack comes from JSON / env, not from the client. Refunds are requests, not payouts.
17. Escalation Rules: chargebacks → Risk + owner email. Refund after download → owner decision. Health fail for 5 minutes → owner. Any copy that sounds like a subscription → Governance block (file change required).
18. KPIs: landing→unlock, unlock success rate, demo vs live grants, $9 conversion, download clicks, refund request count, webhook failure count, time-to-first-unlock after purchase.
19. Logging Requirements: structured events with pack id and redacted email context. No card numbers. No secrets. No raw tokens in public HTML except the path the holder already has.
20. Audit Trail Requirements: git history of packs.json, Vercel deploy history, Stripe dashboard for live charges, `/api/events` ring (ephemeral), owner mailbox for refunds.
21. Compliance Requirements: printed prices, no negative-option billing, named owner in footer, 14-day refund policy in plain language, minimal PII (email + pack + timestamp).
22. Future Expansion Ideas: email the token after Stripe success, signed time-limited download URLs, durable entitlement table, attach to Aurora cookies automatically, multi-currency, license seats.
23. Risks: demo tokens are valid if the secret leaks; event ring is not durable across serverless isolates; live buyers must re-enter email until email delivery exists; public pack files are downloadable by URL if guessed — treat them as paid convenience, not fortress DRM.
24. Testing Strategy: `npm run build`; GET `/api/health`; demo unlock → delivery page; live flag without secret still demo-safe; live flag with secret rejects demo fulfill (402); webhook with bad signature returns 400; unknown token 404; refund page contains owner email.
25. Production Readiness Checklist: modular, API-first, evented, demo-safe, health endpoint, legal page, env-only config, printed $9 paywall, no subscription, Vercel config present. Not ready: durable order database, emailed receipts from this app, cryptographic file DRM.
26. Suggested Technology Stack: Next.js 14, React 18, TypeScript, Stripe, Vercel, HMAC tokens, JSON catalog.
27. Cost Estimate: Vercel Hobby $0. Stripe fees only on live $9 charges. No LLM calls in this module. Domain optional.
28. Deployment Plan: create repo, import in Vercel, paste `.env.example`, set `NEXT_PUBLIC_BASE_URL` to the Vercel URL, deploy, hit `/api/health`, run one demo unlock, optionally add Stripe and flip demo off.
29. Maintenance Strategy: change copy and prices in `data/packs.json` or env. Rotate `UNLOCK_SECRET` only when you can re-issue tokens. Roll back the Vercel release if a deploy breaks unlocks.
30. Opportunities for Additional AI Automation: auto-email the token after `order.paid`; support agent drafts refund replies from `/refund`; analytics agent scores $9 conversion; content agent rewrites locker blurbs behind a preview deploy.

Completed today: Quay locker + signed entitlements + $9 priority paywall + GitHub repo.
Dependencies: Day 1 Public Storefront (Aurora / Nexus / Aether catalog and checkout).
Tomorrow: Email Receipt & Token Delivery Agent (sends the unlock link after payment).
Platform completion: 14%.
