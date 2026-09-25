"use client";

import { useState } from "react";

export function UnlockForm() {
  const [email, setEmail] = useState("");
  const [packId, setPackId] = useState("starter");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/fulfill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, packId, source: "demo" }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error || "Could not unlock.");
      return;
    }
    window.location.href = `/deliver/${data.token}`;
  }

  return (
    <form onSubmit={onSubmit} className="card">
      <label htmlFor="email">Email used at checkout</label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <label htmlFor="pack">Which pack?</label>
      <select
        id="pack"
        value={packId}
        onChange={(e) => setPackId(e.target.value)}
        style={{ width: "100%", padding: "10px 12px", fontSize: 16, borderRadius: 8 }}
      >
        <option value="starter">Starter Pack</option>
        <option value="brief">Agent Brief Pack</option>
        <option value="playbook">Operator Playbook</option>
        <option value="priority">Priority Locker ($9)</option>
      </select>
      <p className="muted">
        Demo mode issues a signed unlock immediately. Live mode only accepts a paid Stripe order.
      </p>
      {error ? <p>{error}</p> : null}
      <button type="submit" disabled={busy}>
        {busy ? "Opening…" : "Open my locker"}
      </button>
    </form>
  );
}
