import Link from "next/link";
import { Suspense } from "react";
import { getJobsForLocationAndDemographic } from "@/lib/mock-jobs";
import { SearchResults } from "@/components/SearchResults";
import { SearchBar, SearchBarFallback } from "@/components/SearchBar";
import type { Job } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{ location?: string; demographic?: string; id?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const location = params.location ?? "";
  const demographic = params.demographic ?? "";
  const selectedId = params.id ?? null;

  const jobs = getJobsForLocationAndDemographic(location, demographic);
  const selectedJob = selectedId
    ? jobs.find((j) => j.id === selectedId) ?? jobs[0]
    : jobs[0] ?? null;

  const subtitle =
    [demographic, location].filter(Boolean).length > 0
      ? `${demographic || "All roles"} ${location ? `in ${location}` : ""}`
      : "All recent shootings and jobs";

  const makeDemographicHref = (value: string) => {
    const p = new URLSearchParams();
    if (location) p.set("location", location);
    p.set("demographic", value);
    return `/search?${p.toString()}`;
  };

  return (
    <div className="min-h-screen bg-[var(--play-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Suspense fallback={<SearchBarFallback compact variant="play" />}>
          <SearchBar compact variant="play" />
        </Suspense>
        <p className="mt-4 text-sm font-medium text-[var(--play-muted)]">
          {jobs.length} {jobs.length === 1 ? "opportunity" : "opportunities"} · {subtitle}
        </p>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide md:flex-wrap">
          {[
            { value: "directing", label: "Directing" },
            { value: "writing", label: "Writing" },
            { value: "acting", label: "Acting" },
            { value: "crew", label: "Crew" },
          ].map((d) => {
            const isActive = demographic.toLowerCase() === d.value;
            const href = makeDemographicHref(d.value);
            return (
              <Link
                key={d.value}
                href={href}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--play-card)] text-[var(--play-muted)] hover:bg-[var(--play-card-hover)] hover:text-[var(--play-text)] border border-[var(--play-border)]"
                }`}
              >
                {d.label}
              </Link>
            );
          })}
        </div>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1 lg:max-w-2xl">
            <SearchResults
              jobs={jobs}
              selectedId={selectedJob?.id ?? null}
              location={location}
              demographic={demographic}
              variant="play"
            />
          </div>
          <aside className="min-w-0 shrink-0 lg:sticky lg:top-4 lg:w-[380px]">
            {selectedJob ? (
              <JobDetail job={selectedJob} />
            ) : (
              <div className="rounded-xl border border-[var(--play-border)] bg-[var(--play-card)] p-8 text-center text-[var(--play-muted)]">
                Select a listing to view details.
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function JobDetail({ job }: { job: Job }) {
  return (
    <div className="sticky top-4 rounded-xl border border-[var(--play-border)] bg-[var(--play-card)] p-6">
      <h2 className="text-xl font-bold text-[var(--play-text)]">{job.title}</h2>
      <p className="mt-1 text-[var(--accent)] font-medium">{job.company}</p>
      {job.rating != null && (
        <span className="mt-1 inline-block text-sm text-[var(--play-muted)]">
          {job.rating} ★
        </span>
      )}
      <p className="mt-2 text-sm text-[var(--play-muted)]">
        {job.location}
        {job.area ? ` (${job.area})` : ""}
      </p>
      <p className="mt-4 text-sm text-[var(--play-muted)]">
        Account required to apply. (Auth coming soon.)
      </p>
      <Link
        href={`/apply/${job.id}`}
        className="mt-4 block w-full rounded-xl bg-[var(--accent)] py-3.5 text-center font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors"
      >
        Submit application
      </Link>
      <div className="mt-6 border-t border-[var(--play-border)] pt-4">
        <h3 className="font-semibold text-[var(--play-text)]">Description</h3>
        <p className="mt-2 text-sm text-[var(--play-muted)] leading-relaxed">{job.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-[var(--play-bg)] px-3 py-1 text-xs text-[var(--play-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--play-muted)]">Posted {job.postedAt}</p>
      </div>
    </div>
  );
}
