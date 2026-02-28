"use client";

import Link from "next/link";
import type { Job } from "@/lib/types";

export function SearchResults({
  jobs,
  selectedId,
  location,
  demographic,
  variant = "default",
}: {
  jobs: Job[];
  selectedId: string | null;
  location: string;
  demographic: string;
  variant?: "default" | "play";
}) {
  const base = "/search";
  const params = new URLSearchParams();
  if (location) params.set("location", location);
  if (demographic) params.set("demographic", demographic);

  const makeHref = (id: string) => `${base}?${params.toString()}&id=${id}`;
  const isPlay = variant === "play";

  return (
    <div className="w-full">
      <div className={`mb-3 text-sm ${isPlay ? "text-[var(--play-muted)]" : "text-[var(--text-muted)]"}`}>
        Sort by: relevance – date
      </div>
      {jobs.length === 0 ? (
        <div
          className={`rounded-xl p-8 text-center ${
            isPlay
              ? "border border-[var(--play-border)] bg-[var(--play-card)] text-[var(--play-muted)]"
              : "border border-[var(--border)] bg-white text-[var(--text-muted)]"
          }`}
        >
          No opportunities match your search. Try a different location or role.
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-2">
          {jobs.map((job) => (
            <li key={job.id}>
              <Link
                href={makeHref(job.id)}
                className={`group flex flex-col rounded-xl p-4 transition ${
                  isPlay
                    ? selectedId === job.id
                      ? "border-2 border-[var(--accent)] bg-[var(--play-card-hover)] ring-2 ring-[var(--accent)]/30"
                      : "border border-[var(--play-border)] bg-[var(--play-card)] hover:border-[var(--play-muted)]/50 hover:bg-[var(--play-card-hover)]"
                    : selectedId === job.id
                    ? "border-2 border-[var(--accent)] bg-white ring-1 ring-[var(--accent)]"
                    : "border border-[var(--border)] bg-white shadow-sm hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--play-bg)] text-[var(--accent)]">
                    <FilmIcon />
                  </div>
                  <span
                    className={isPlay ? "text-[var(--play-muted)] group-hover:text-[var(--accent)]" : "text-gray-300 group-hover:text-[var(--accent)]"}
                    aria-label="Save"
                  >
                    <BookmarkIcon />
                  </span>
                </div>
                <h3
                  className={`mt-3 line-clamp-2 font-semibold ${isPlay ? "text-[var(--play-text)]" : "text-[var(--foreground)]"}`}
                >
                  {job.title}
                </h3>
                <p className={`mt-0.5 text-xs ${isPlay ? "text-[var(--play-muted)]" : "text-[var(--text-muted)]"}`}>
                  {job.company}
                </p>
                <p className={`text-xs ${isPlay ? "text-[var(--play-muted)]" : "text-[var(--text-muted)]"}`}>
                  {job.location}
                  {job.area ? ` (${job.area})` : ""}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {job.pay && (
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs ${
                        isPlay ? "bg-[var(--play-bg)] text-[var(--play-muted)]" : "bg-gray-100 text-[var(--text-muted)]"
                      }`}
                    >
                      {job.pay}
                    </span>
                  )}
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs ${
                      isPlay ? "bg-[var(--play-bg)] text-[var(--play-muted)]" : "bg-gray-100 text-[var(--text-muted)]"
                    }`}
                  >
                    {job.type}
                  </span>
                </div>
                <p className={`mt-2 text-xs font-medium ${isPlay ? "text-[var(--accent)]" : "text-[var(--accent)]"}`}>
                  {job.postedAt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
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
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
