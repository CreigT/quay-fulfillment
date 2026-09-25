import Link from "next/link";
import { config } from "@/lib/config";

export default function HomePage() {
  return (
    <>
      <h1>{config.tagline}</h1>
      <p className="lead">
        This is the delivery desk for the store. You buy on the storefront. You
        pick the files up here. No account maze. No monthly trap.
      </p>

      <div className="row">
        <Link className="btn" href="/unlock">
          I already paid
        </Link>
        <Link className="btn ghost" href="/priority">
          Add Priority Locker · $9
        </Link>
      </div>

      <div className="grid two">
        <div className="card">
          <h2>1. Buy once</h2>
          <p>
            Prices stay printed: $19, $29, $49 on the store, $9 here for extra
            templates. That is the whole menu.
          </p>
        </div>
        <div className="card">
          <h2>2. Open the locker</h2>
          <p>
            Enter the email you used at checkout. We sign a token and show the
            files. Demo mode works with no Stripe key.
          </p>
        </div>
        <div className="card">
          <h2>3. Keep the files</h2>
          <p>
            Downloads are plain text packs you can save. Refunds are one click
            to request. Money movement still needs the owner.
          </p>
        </div>
        <div className="card">
          <h2>4. Owner stays out</h2>
          <p>
            {config.owner} is the legal owner and emergency override. Daily
            delivery is this site. Change variables. Push to Vercel.
          </p>
        </div>
      </div>

      <p className="muted">
        Connected storefront: <a href={config.storefrontUrl}>{config.storefrontUrl}</a>
        {config.demoMode ? " · Demo mode is on." : " · Live payments are on."}
      </p>
    </>
  );
}
