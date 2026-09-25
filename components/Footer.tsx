import Link from "next/link";
import { config } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bot">
      <div className="wrap">
        <span>
          {config.company} · owned by {config.owner} · {config.supportEmail}
        </span>
        <span>
          <Link href="/legal">Legal</Link>
          {" · "}
          <Link href="/status">Agents</Link>
          {" · "}
          <a href={config.storefrontUrl}>Store</a>
        </span>
      </div>
    </footer>
  );
}
