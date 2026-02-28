"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const LOCATION_PLACEHOLDER = "City, state, or zip";
const DEMO_PLACEHOLDER = "Role: directing, acting, writers, crew";

export function SearchBarFallback({ compact = false, variant = "default" }: { compact?: boolean; variant?: "default" | "play" }) {
  const py = compact ? "py-3" : "py-4";
  const isPlay = variant === "play";
  return (
    <div className={`flex max-w-4xl gap-0 rounded-xl overflow-hidden animate-pulse ${
      isPlay ? "border border-[var(--play-border)] bg-[var(--play-card)]" : "border border-[var(--border)] bg-white shadow-sm"
    }`}>
      <span className={`flex items-center pl-4 ${isPlay ? "text-[var(--play-muted)]" : "text-[var(--text-muted)]"}`}><SearchIcon /></span>
      <div className={`min-w-0 flex-1 ${py} px-3 rounded ${isPlay ? "bg-[var(--play-bg)]" : "bg-gray-100"}`} />
      <span className={`flex items-center pl-2 ${isPlay ? "text-[var(--play-muted)]" : "text-[var(--text-muted)]"}`}><PinIcon /></span>
      <div className={`w-52 ${py} px-3 rounded border-l ${isPlay ? "border-[var(--play-border)] bg-[var(--play-bg)]" : "border-[var(--border)] bg-gray-100"}`} />
      <div className={`w-24 ${py} bg-[var(--accent)] opacity-70`} />
    </div>
  );
}

export function SearchBar({ compact = false, variant = "default" }: { compact?: boolean; variant?: "default" | "play" }) {
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
  const isPlay = variant === "play";

  return (
    <form
      className={`flex max-w-4xl gap-0 rounded-xl overflow-hidden ${
        isPlay
          ? "border border-[var(--play-border)] bg-[var(--play-card)]"
          : "border border-[var(--border)] bg-white shadow-sm"
      }`}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <span className={`flex items-center pl-4 ${isPlay ? "text-[var(--play-muted)]" : "text-[var(--text-muted)]"}`} aria-hidden>
        <SearchIcon />
      </span>
      <input
        type="text"
        placeholder={DEMO_PLACEHOLDER}
        value={demographic}
        onChange={(e) => setDemographic(e.target.value)}
        className={`min-w-0 flex-1 ${py} px-3 bg-transparent ${
          isPlay
            ? "text-[var(--play-text)] placeholder:text-[var(--play-muted)]"
            : "text-[var(--foreground)] placeholder:text-[var(--text-muted)]"
        }`}
      />
      <span className={`flex items-center pl-2 ${isPlay ? "text-[var(--play-muted)]" : "text-[var(--text-muted)]"}`} aria-hidden>
        <PinIcon />
      </span>
      <input
        type="text"
        placeholder={LOCATION_PLACEHOLDER}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className={`w-52 ${py} px-3 bg-transparent border-l ${
          isPlay
            ? "border-[var(--play-border)] text-[var(--play-text)] placeholder:text-[var(--play-muted)]"
            : "border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--text-muted)]"
        }`}
      />
      <button
        type="submit"
        className={`bg-[var(--accent)] ${pxBtn} ${py} font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors`}
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
