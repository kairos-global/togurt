"use client";

import { useState } from "react";

export function ApplicationForm({ jobId }: { jobId: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: upload to Supabase storage and create application + application_files when auth is ready
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-6 rounded-xl border border-[var(--accent)] bg-[var(--accent)]/10 p-6 text-center">
        <p className="font-medium text-[var(--play-text)]">Application submitted</p>
        <p className="mt-1 text-sm text-[var(--play-muted)]">
          Your files have been received. Sign in later to track this application.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      <section>
        <label className="block font-medium text-[var(--play-text)]">Resume (PDF)</label>
        <p className="mt-0.5 text-sm text-[var(--play-muted)]">Required. PDF only.</p>
        <input
          type="file"
          accept="application/pdf"
          required
          onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
          className="mt-2 block w-full text-sm text-[var(--play-muted)] file:mr-4 file:rounded file:border-0 file:bg-[var(--accent)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[var(--accent-hover)]"
        />
        {resumeFile && (
          <p className="mt-1 text-xs text-[var(--play-muted)]">{resumeFile.name}</p>
        )}
      </section>

      <section>
        <label className="block font-medium text-[var(--play-text)]">Video resume</label>
        <p className="mt-0.5 text-sm text-[var(--play-muted)]">Required. Video file.</p>
        <input
          type="file"
          accept="video/*"
          required
          onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
          className="mt-2 block w-full text-sm text-[var(--play-muted)] file:mr-4 file:rounded file:border-0 file:bg-[var(--accent)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[var(--accent-hover)]"
        />
        {videoFile && (
          <p className="mt-1 text-xs text-[var(--play-muted)]">{videoFile.name}</p>
        )}
      </section>

      <section>
        <label className="block font-medium text-[var(--play-text)]">Portfolio link (optional)</label>
        <p className="mt-0.5 text-sm text-[var(--play-muted)]">
          Upload a PDF or text file with your portfolio or reel links.
        </p>
        <input
          type="file"
          accept=".pdf,.txt,application/pdf,text/plain"
          onChange={(e) => setPortfolioFile(e.target.files?.[0] ?? null)}
          className="mt-2 block w-full text-sm text-[var(--play-muted)] file:mr-4 file:rounded file:border-0 file:bg-[var(--play-bg)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[var(--play-text)] hover:file:bg-[var(--play-card-hover)]"
        />
        {portfolioFile && (
          <p className="mt-1 text-xs text-[var(--play-muted)]">{portfolioFile.name}</p>
        )}
      </section>

      <button
        type="submit"
        className="w-full rounded-xl bg-[var(--accent)] py-3.5 font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors"
      >
        Submit application
      </button>
    </form>
  );
}
