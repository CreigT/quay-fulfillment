import agents from "@/data/agents.json";
import { config } from "@/lib/config";

export default function StatusPage() {
  return (
    <>
      <h1>Agent board</h1>
      <p className="lead">Read-only. Agents publish status. You do not drive them.</p>
      {(agents as any[]).map((a) => (
        <div className="card" key={a.id}>
          <strong>{a.name}</strong>
          <span className="muted"> · {a.layer} · {a.status}</span>
          <p>{a.job}</p>
        </div>
      ))}
      <p className="muted">
        Demo mode: {String(config.demoMode)}. Store: {config.storefrontUrl}
      </p>
    </>
  );
}
