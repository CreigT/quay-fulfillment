# Quay — Digital Fulfillment & Entitlement (Day 2)

You bought something on the storefront. This site is the door.

You are the **legal owner**. You are not the operator.

Change the variables. Push to GitHub. Deploy on Vercel.

## What this is

A small, readable delivery desk:

- Landing page anyone can understand
- Unlock form (email + pack)
- Locker list with printed prices
- One reasonable paywall: Priority Locker at **$9 once**
- Refund page that does not auto-move money
- Signed tokens other agents can verify
- Demo mode by default

It builds on Day 1: [aurora-autonomous-commerce](https://github.com/CreigT/aurora-autonomous-commerce).

## What you do

1. Import https://github.com/CreigT/quay-fulfillment in [Vercel](https://vercel.com/new).
2. Copy `.env.example` into Project Settings → Environment Variables.
3. Set your name, support email, site URL, and a long `UNLOCK_SECRET`.
4. Point `NEXT_PUBLIC_STOREFRONT_URL` at your Aurora (or Nexus) store.
5. Deploy.
6. Open `/api/health`, then `/unlock`.

You do not need to edit React to open the locker.

## Pages

| URL | Purpose |
| --- | --- |
| `/` | Plain landing |
| `/unlock` | Open a paid (or demo) pack |
| `/locker` | The four shelves |
| `/priority` | $9 add-on paywall |
| `/deliver/[token]` | Download page |
| `/refund` | How to ask for money back |
| `/legal` | Owner, prices, data |
| `/status` | Read-only agent board |
| `/api/health` | Liveness |
| `/api/fulfill` | Issue an unlock |
| `/api/entitlements` | Verify a token |
| `/api/checkout` | Start the $9 payment |
| `/api/webhook` | Stripe events |
| `/api/events` | Recent agent events |
| `/api/agents/status` | Heartbeat |

## Demo vs live money

- **Demo (default):** unlock and $9 checkout write a signed token and send you to `/deliver/...`.
- **Live:** set Stripe keys and `NEXT_PUBLIC_DEMO_MODE=false`. Webhook path: `/api/webhook`.

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

Full engineering contract: [MODULE.md](./MODULE.md)
