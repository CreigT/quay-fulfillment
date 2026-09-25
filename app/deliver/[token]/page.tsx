import Link from "next/link";
import { notFound } from "next/navigation";
import { readToken } from "@/lib/token";
import { getPack } from "@/lib/packs";

export default function DeliverPage({ params }: { params: { token: string } }) {
  const ent = readToken(params.token);
  if (!ent) notFound();
  const pack = getPack(ent.packId);
  if (!pack) notFound();

  return (
    <>
      <p className="ok">Unlocked</p>
      <h1>{pack.name}</h1>
      <p className="lead">{pack.summary}</p>
      <div className="card">
        <p>
          <strong>Email</strong> {ent.email}
        </p>
        <p>
          <strong>Source</strong> {ent.source}
        </p>
        <p>
          <strong>Granted</strong> {new Date(ent.grantedAt).toLocaleString()}
        </p>
        <a className="btn" href={pack.file} download>
          Download pack
        </a>
      </div>
      <p>
        Want the extra templates? <Link href="/priority">Priority Locker is $9</Link>.
      </p>
    </>
  );
}
