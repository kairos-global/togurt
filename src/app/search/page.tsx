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

  const searchBase = "/search";
  const locationParam = location ? `location=${encodeURIComponent(location)}` : "";
  const makeDemographicHref = (value: string) => {
    const p = new URLSearchParams();
    if (location) p.set("location", location);
    p.set("demographic", value);
    return `${searchBase}?${p.toString()}`;
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <Suspense fallback={<SearchBarFallback compact />}>
          <SearchBar compact />
        </Suspense>
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          {jobs.length} {jobs.length === 1 ? "opportunity" : "opportunities"} – {subtitle}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
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
                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                  isActive
                    ? "border-[var(--indeed-blue)] bg-[var(--indeed-blue)]/10 text-[var(--foreground)]"
                    : "border-[var(--border)] bg-white text-[var(--foreground)] hover:bg-gray-50"
                }`}
              >
                {d.label}
              </Link>
            );
          })}
        </div>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row">
          <SearchResults
            jobs={jobs}
            selectedId={selectedJob?.id ?? null}
            location={location}
            demographic={demographic}
          />
          <aside className="min-w-0 flex-1 lg:min-w-[380px]">
            {selectedJob ? (
              <JobDetail job={selectedJob} />
            ) : (
              <div className="rounded-lg border border-[var(--border)] bg-white p-8 text-center text-[var(--text-muted)]">
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
    <div className="sticky top-4 rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-[var(--foreground)]">{job.title}</h2>
      <p className="mt-1 text-[var(--indeed-blue)]">{job.company}</p>
      {job.rating != null && (
        <span className="mt-1 inline-block text-sm text-[var(--text-muted)]">
          {job.rating} ★
        </span>
      )}
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        {job.location}
        {job.area ? ` (${job.area})` : ""}
      </p>
      <p className="mt-4 text-sm text-[var(--text-muted)]">
        Account required to apply. (Auth coming soon.)
      </p>
      <Link
        href={`/apply/${job.id}`}
        className="mt-4 block w-full rounded-lg bg-[var(--indeed-blue)] py-3 text-center font-medium text-white hover:bg-[var(--indeed-blue-hover)]"
      >
        Submit application
      </Link>
      <div className="mt-6 border-t border-[var(--border)] pt-4">
        <h3 className="font-semibold text-[var(--foreground)]">Description</h3>
        <p className="mt-2 text-sm text-[var(--foreground)]">{job.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-[var(--text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--text-muted)]">Posted {job.postedAt}</p>
      </div>
    </div>
  );
}
