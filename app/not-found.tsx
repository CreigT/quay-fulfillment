import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>That locker is empty</h1>
      <p className="lead">The link is wrong or the token is not valid.</p>
      <Link className="btn" href="/unlock">
        Try unlock again
      </Link>
    </>
  );
}
