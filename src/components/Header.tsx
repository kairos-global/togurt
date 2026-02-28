import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-[var(--indeed-blue)]">
          Togurt
        </Link>
        <nav className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
          <Link href="/" className="text-[var(--foreground)] underline decoration-[var(--indeed-blue)] decoration-2 underline-offset-4">
            Home
          </Link>
          <Link href="/" className="hover:text-[var(--foreground)]">Company reviews</Link>
          <Link href="/" className="hover:text-[var(--foreground)]">Find salaries</Link>
          <span className="h-4 w-px bg-[var(--border)]" aria-hidden />
          <Link href="/" className="hover:text-[var(--foreground)]">Sign in</Link>
          <Link href="/" className="hover:text-[var(--foreground)]">Producers / Post project</Link>
        </nav>
      </div>
    </header>
  );
}
