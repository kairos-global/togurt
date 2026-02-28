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
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link
          href={`/search?id=${jobId}`}
          className="text-sm text-[var(--indeed-blue)] hover:underline"
        >
          ← Back to search
        </Link>
        <div className="mt-4 rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
          <h1 className="text-xl font-bold text-[var(--foreground)]">{job.title}</h1>
          <p className="mt-1 text-[var(--indeed-blue)]">{job.company}</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {job.location}
            {job.area ? ` (${job.area})` : ""}
          </p>
        </div>
        <div className="mt-6 rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Submit application</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Upload your files below. You can sign in later to track your application.
          </p>
          <ApplicationForm jobId={jobId} />
        </div>
      </div>
    </div>
  );
}
