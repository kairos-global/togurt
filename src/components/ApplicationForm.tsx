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
      <div className="mt-6 rounded-lg border border-[var(--indeed-blue)] bg-[var(--indeed-blue)]/10 p-6 text-center">
        <p className="font-medium text-[var(--foreground)]">Application submitted</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Your files have been received. Sign in later to track this application.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      <section>
        <label className="block font-medium text-[var(--foreground)]">Resume (PDF)</label>
        <p className="mt-0.5 text-sm text-[var(--text-muted)]">Required. PDF only.</p>
        <input
          type="file"
          accept="application/pdf"
          required
          onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
          className="mt-2 block w-full text-sm text-[var(--text-muted)] file:mr-4 file:rounded file:border-0 file:bg-[var(--indeed-blue)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[var(--indeed-blue-hover)]"
        />
        {resumeFile && (
          <p className="mt-1 text-xs text-[var(--text-muted)]">{resumeFile.name}</p>
        )}
      </section>

      <section>
        <label className="block font-medium text-[var(--foreground)]">Video resume</label>
        <p className="mt-0.5 text-sm text-[var(--text-muted)]">Required. Video file.</p>
        <input
          type="file"
          accept="video/*"
          required
          onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
          className="mt-2 block w-full text-sm text-[var(--text-muted)] file:mr-4 file:rounded file:border-0 file:bg-[var(--indeed-blue)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[var(--indeed-blue-hover)]"
        />
        {videoFile && (
          <p className="mt-1 text-xs text-[var(--text-muted)]">{videoFile.name}</p>
        )}
      </section>

      <section>
        <label className="block font-medium text-[var(--foreground)]">Portfolio link (optional)</label>
        <p className="mt-0.5 text-sm text-[var(--text-muted)]">
          Upload a PDF or text file with your portfolio or reel links.
        </p>
        <input
          type="file"
          accept=".pdf,.txt,application/pdf,text/plain"
          onChange={(e) => setPortfolioFile(e.target.files?.[0] ?? null)}
          className="mt-2 block w-full text-sm text-[var(--text-muted)] file:mr-4 file:rounded file:border-0 file:bg-gray-200 file:px-4 file:py-2 file:text-sm file:font-medium file:text-[var(--foreground)] hover:file:bg-gray-300"
        />
        {portfolioFile && (
          <p className="mt-1 text-xs text-[var(--text-muted)]">{portfolioFile.name}</p>
        )}
      </section>

      <button
        type="submit"
        className="w-full rounded-lg bg-[var(--indeed-blue)] py-3 font-medium text-white hover:bg-[var(--indeed-blue-hover)]"
      >
        Submit application
      </button>
    </form>
  );
}
