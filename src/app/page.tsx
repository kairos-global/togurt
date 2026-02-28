import Link from "next/link";
import { Suspense } from "react";
import { SearchBar, SearchBarFallback } from "@/components/SearchBar";
import { MOCK_JOBS } from "@/lib/mock-jobs";

export default function Home() {
  const featured = MOCK_JOBS.slice(0, 4);
  const categories = [
    { value: "directing", label: "Directing" },
    { value: "writing", label: "Writing" },
    { value: "acting", label: "Acting" },
    { value: "crew", label: "Crew" },
  ];

  return (
    <div className="min-h-screen bg-[var(--play-bg)]">
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-8 md:pt-10 md:pb-16">
        <Suspense fallback={<SearchBarFallback variant="play" />}>
          <SearchBar variant="play" />
        </Suspense>

        <p className="mt-6 text-center text-[var(--play-text)] font-semibold">
          Your next short film opportunity starts here
        </p>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:justify-center">
          {categories.map((c) => (
            <Link
              key={c.value}
              href={`/search?demographic=${c.value}`}
              className="shrink-0 rounded-full border border-[var(--play-border)] bg-[var(--play-card)] px-5 py-2 text-sm font-medium text-[var(--play-muted)] transition hover:bg-[var(--play-card-hover)] hover:text-[var(--play-text)]"
            >
              {c.label}
            </Link>
          ))}
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-[var(--play-text)]">Recent opportunities</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featured.map((job) => (
              <Link
                key={job.id}
                href={`/search?id=${job.id}`}
                className="flex flex-col rounded-xl border border-[var(--play-border)] bg-[var(--play-card)] p-4 transition hover:border-[var(--accent)]/50 hover:bg-[var(--play-card-hover)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--play-bg)] text-[var(--accent)]">
                  <FilmIcon />
                </div>
                <h3 className="mt-3 line-clamp-2 font-semibold text-[var(--play-text)]">{job.title}</h3>
                <p className="mt-0.5 text-xs text-[var(--play-muted)]">{job.company}</p>
                <p className="mt-1 text-xs text-[var(--play-muted)]">
                  {job.location}
                  {job.area ? ` · ${job.area}` : ""}
                </p>
                <span className="mt-auto pt-2 text-xs font-medium text-[var(--accent)]">View →</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-10 text-center">
          <Link
            href="/search"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-3.5 font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors"
          >
            Explore all opportunities →
          </Link>
        </div>
      </div>
    </div>
  );
}

function FilmIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  );
}
