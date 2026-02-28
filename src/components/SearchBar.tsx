"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const LOCATION_PLACEHOLDER = "City, state, or zip";
const DEMO_PLACEHOLDER = "Role: directing, acting, writers, crew";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [demographic, setDemographic] = useState(searchParams.get("demographic") ?? "");

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (demographic.trim()) params.set("demographic", demographic.trim());
    router.push(`/search?${params.toString()}`);
  }, [location, demographic, router]);

  const py = compact ? "py-3" : "py-4";
  const pxBtn = compact ? "px-6" : "px-8";

  return (
    <form
      className="flex max-w-4xl gap-0 rounded-lg border border-[var(--border)] bg-white shadow-sm overflow-hidden"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <span className="flex items-center pl-4 text-[var(--text-muted)]" aria-hidden>
        <SearchIcon />
      </span>
      <input
        type="text"
        placeholder={DEMO_PLACEHOLDER}
        value={demographic}
        onChange={(e) => setDemographic(e.target.value)}
        className={`min-w-0 flex-1 ${py} px-3 text-[var(--foreground)] placeholder:text-[var(--text-muted)]`}
      />
      <span className="flex items-center pl-2 text-[var(--text-muted)]" aria-hidden>
        <PinIcon />
      </span>
      <input
        type="text"
        placeholder={LOCATION_PLACEHOLDER}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className={`w-52 ${py} px-3 text-[var(--foreground)] placeholder:text-[var(--text-muted)] border-l border-[var(--border)]`}
      />
      <button
        type="submit"
        className={`bg-[var(--indeed-blue)] ${pxBtn} ${py} font-medium text-white hover:bg-[var(--indeed-blue-hover)]`}
      >
        Search
      </button>
    </form>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
