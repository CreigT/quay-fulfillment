import { BuyPriority } from "@/components/BuyPriority";
import { config } from "@/lib/config";

export default function PriorityPage() {
  return (
    <>
      <h1>Priority Locker · ${config.priorityPrice}</h1>
      <p className="lead">
        One extra pack. Paid once. No renewal. You keep the files even if you
        never come back.
      </p>
      <div className="card">
        <h2>What $9 adds</h2>
        <ul>
          <li>Refund reply script</li>
          <li>Weekly review sheet</li>
          <li>One-page incident log</li>
        </ul>
        <p className="muted">
          This is the only paywall on this site. The storefront already sold the
          main packs.
        </p>
      </div>
      <BuyPriority />
    </>
  );
}
