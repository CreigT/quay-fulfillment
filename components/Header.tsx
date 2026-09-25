import Link from "next/link";
import { config } from "@/lib/config";

export function Header() {
  return (
    <header className="top">
      <div className="wrap">
        <Link className="brand" href="/">
          {config.company}
        </Link>
        <nav>
          <Link href="/unlock">Unlock</Link>
          <Link href="/locker">Locker</Link>
          <Link href="/priority">$9 add-on</Link>
          <Link href="/refund">Refunds</Link>
        </nav>
      </div>
    </header>
  );
}
