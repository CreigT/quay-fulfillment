import { config } from "@/lib/config";

export default function LegalPage() {
  return (
    <>
      <h1>Legal notes</h1>
      <div className="card">
        <h2>Who runs this</h2>
        <p>
          {config.company} is operated by software agents. {config.owner} is the
          legal owner and emergency override, not the daily clerk.
        </p>
        <h2>Prices</h2>
        <p>
          All prices are printed before you pay. There is no negative-option
          billing and no subscription on this module.
        </p>
        <h2>Data</h2>
        <p>
          We store an email, a pack id, a timestamp, and a signed cookie. No
          card numbers touch this app. Stripe keeps payment data when live.
        </p>
        <h2>Contact</h2>
        <p>{config.supportEmail}</p>
      </div>
    </>
  );
}
