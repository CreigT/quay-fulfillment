import { config } from "@/lib/config";

export default function RefundPage() {
  const mail = `mailto:${config.supportEmail}?subject=Refund%20request`;
  return (
    <>
      <h1>Ask for a refund</h1>
      <p className="lead">
        Digital packs can be refunded within 14 days if you have not copied the
        files into another system. The owner approves the money movement.
      </p>
      <div className="card">
        <ol>
          <li>Open your locker and note the pack name.</li>
          <li>Send one email. Subject line: Refund request.</li>
          <li>Include the email you paid with.</li>
          <li>Wait. Risk Agent flags it. Owner decides.</li>
        </ol>
        <a className="btn" href={mail}>
          Email {config.supportEmail}
        </a>
      </div>
      <p className="muted">
        Chargebacks skip this page and go to Risk + the owner. Do not promise
        instant cash from this form. There is no silent auto-refund of live
        charges.
      </p>
    </>
  );
}
