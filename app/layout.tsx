import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Apna Stay", template: "%s | Apna Stay" },
  description:
    "Discover a different side of India with the Apna Stay booking demo.",
  robots: { index: false, follow: false },
};

function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label="Apna Stay home">
      <svg
        width="31"
        height="31"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill="currentColor" />
        <path
          d="M7 22L16 10L25 22M12 22V19H20V22"
          stroke="#FAF8F5"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23.5" cy="10" r="1.4" fill="#FAF8F5" />
      </svg>
      <span>Apna Stay</span>
    </Link>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <header className="shell site-header">
          <Wordmark />
          <nav aria-label="Main navigation">
            <Link href="/#stays">Explore stays</Link>
          </nav>
        </header>
        {children}
        <footer className="shell site-footer">
          <Wordmark />
          <p>Demo. Reservations and payments are simulated.</p>
        </footer>
      </body>
    </html>
  );
}
