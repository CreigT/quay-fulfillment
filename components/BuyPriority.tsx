"use client";

import { useState } from "react";

export function BuyPriority() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function buy() {
    setBusy(true);
    setError("");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, packId: "priority" }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error || "Checkout failed.");
      return;
    }
    window.location.href = data.url;
  }

  return (
    <div className="card">
      <label htmlFor="priority-email">Email for the receipt</label>
      <input
        id="priority-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      {error ? <p>{error}</p> : null}
      <div className="row" style={{ marginTop: 12 }}>
        <button type="button" onClick={buy} disabled={busy || !email}>
          {busy ? "Starting…" : "Pay $9 once"}
        </button>
      </div>
    </div>
  );
}
