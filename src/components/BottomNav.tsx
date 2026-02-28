"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isExplore = pathname?.startsWith("/search") ?? false;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--play-border)] bg-[var(--play-card)] md:hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 8px)" }}
    >
      <div className="flex items-center justify-around py-2">
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 px-4 py-2 text-xs font-medium ${
            isHome ? "text-[var(--accent)]" : "text-[var(--play-muted)]"
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </Link>
        <Link
          href="/search"
          className={`flex flex-col items-center gap-0.5 px-4 py-2 text-xs font-medium ${
            isExplore ? "text-[var(--accent)]" : "text-[var(--play-muted)]"
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span>Explore</span>
        </Link>
        <Link href="/" className="flex flex-col items-center gap-0.5 px-4 py-2 text-xs font-medium text-[var(--play-muted)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Account</span>
        </Link>
      </div>
    </nav>
  );
}
