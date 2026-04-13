"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 py-24">
      <h1 className="text-4xl font-bold text-text-dark">
        Something went wrong
      </h1>
      <p className="text-lg text-text-muted">{error.message}</p>
      <button
        onClick={reset}
        className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 text-white font-bold hover:bg-brand-dark transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
