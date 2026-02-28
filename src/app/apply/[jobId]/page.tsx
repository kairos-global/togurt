import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_JOBS } from "@/lib/mock-jobs";
import { ApplicationForm } from "@/components/ApplicationForm";

interface PageProps {
  params: Promise<{ jobId: string }>;
}

export default async function ApplyPage({ params }: PageProps) {
  const { jobId } = await params;
  const job = MOCK_JOBS.find((j) => j.id === jobId);
  if (!job) notFound();

  return (
    <div className="min-h-screen bg-[var(--play-bg)]">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link
          href={`/search?id=${jobId}`}
          className="text-sm text-[var(--accent)] hover:underline"
        >
          ← Back to search
        </Link>
        <div className="mt-4 rounded-xl border border-[var(--play-border)] bg-[var(--play-card)] p-6">
          <h1 className="text-xl font-bold text-[var(--play-text)]">{job.title}</h1>
          <p className="mt-1 text-[var(--accent)] font-medium">{job.company}</p>
          <p className="mt-1 text-sm text-[var(--play-muted)]">
            {job.location}
            {job.area ? ` (${job.area})` : ""}
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-[var(--play-border)] bg-[var(--play-card)] p-6">
          <h2 className="text-lg font-semibold text-[var(--play-text)]">Submit application</h2>
          <p className="mt-1 text-sm text-[var(--play-muted)]">
            Upload your files below. You can sign in later to track your application.
          </p>
          <ApplicationForm jobId={jobId} />
        </div>
      </div>
    </div>
  );
}
