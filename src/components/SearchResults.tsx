"use client";

import Link from "next/link";
import type { Job } from "@/lib/types";

export function SearchResults({
  jobs,
  selectedId,
  location,
  demographic,
}: {
  jobs: Job[];
  selectedId: string | null;
  location: string;
  demographic: string;
}) {
  const base = "/search";
  const params = new URLSearchParams();
  if (location) params.set("location", location);
  if (demographic) params.set("demographic", demographic);

  const makeHref = (id: string) => `${base}?${params.toString()}&id=${id}`;

  return (
    <div className="flex w-full max-w-md flex-col gap-2 lg:max-w-lg">
      <div className="flex items-center justify-between text-sm text-[var(--text-muted)]">
        <span>Sort by: relevance – date</span>
      </div>
      {jobs.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-white p-8 text-center text-[var(--text-muted)]">
          No opportunities match your search. Try a different location or role.
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {jobs.map((job) => (
            <li key={job.id}>
              <Link
                href={makeHref(job.id)}
                className={`block rounded-lg border bg-white p-4 transition shadow-sm ${
                  selectedId === job.id
                    ? "border-[var(--indeed-blue)] ring-1 ring-[var(--indeed-blue)]"
                    : "border-[var(--border)] hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[var(--foreground)]">{job.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{job.company}</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {job.location}
                      {job.area ? ` (${job.area})` : ""}
                    </p>
                  </div>
                  <span className="text-gray-300 hover:text-[var(--indeed-blue)]" aria-label="Save">
                    <BookmarkIcon />
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {job.pay && (
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-[var(--text-muted)]">
                      {job.pay}
                    </span>
                  )}
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-[var(--text-muted)]">
                    {job.type}
                  </span>
                  {job.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-gray-100 px-2 py-0.5 text-xs text-[var(--text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function BookmarkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
