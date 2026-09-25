import { UnlockForm } from "@/components/UnlockForm";

export default function UnlockPage() {
  return (
    <>
      <h1>Unlock your locker</h1>
      <p className="lead">
        Type the email from your receipt. Choose the pack you bought. We open
        the door.
      </p>
      <UnlockForm />
      <p className="muted">
        Lost the email? Write {process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "the owner"} and
        include the last four of the card or the demo order time.
      </p>
    </>
  );
}
