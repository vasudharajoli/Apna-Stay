import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell not-found" id="main-content">
      <h1>Stay unavailable</h1>
      <p>The demo listing you’re looking for could not be found.</p>
      <Link className="text-link" href="/#stays">
        Explore demo stays
      </Link>
    </main>
  );
}
