import Link from "next/link";
import { Suspense } from "react";
import { SearchBar, SearchBarFallback } from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="mx-auto max-w-4xl px-4 pt-10 pb-16">
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
        <div className="mt-16 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-[var(--foreground)]">Togurt</h1>
          <p className="mt-4 text-xl font-semibold text-[var(--foreground)]">
            Your next short film opportunity starts here
          </p>
          <p className="mt-3 text-[var(--text-muted)]">
            Create an account or sign in to see personalized recommendations. (Coming soon.)
          </p>
          <Link
            href="/search"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--indeed-blue)] px-8 py-3 font-medium text-white hover:bg-[var(--indeed-blue-hover)]"
          >
            Get started →
          </Link>
        </div>
      </div>
    </div>
  );
}
