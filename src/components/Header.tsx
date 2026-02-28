"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const isExplore = pathname?.startsWith("/search") ?? false;

  return (
    <header className="border-b border-[var(--play-border)] bg-[var(--play-bg)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-[var(--accent)]">
          Togurt
        </Link>
        <nav className="hidden items-center gap-4 text-sm text-[var(--play-muted)] sm:flex sm:gap-6">
          <Link
            href="/"
            className={pathname === "/" ? "text-[var(--play-text)] font-medium" : "hover:text-[var(--play-text)]"}
          >
            Home
          </Link>
          <Link
            href="/search"
            className={isExplore ? "text-[var(--accent)] font-medium" : "hover:text-[var(--play-text)]"}
          >
            Explore
          </Link>
          <Link href="/" className="hover:text-[var(--play-text)]">Sign in</Link>
          <Link href="/" className="hover:text-[var(--play-text)]">Post project</Link>
        </nav>
      </div>
    </header>
  );
}
