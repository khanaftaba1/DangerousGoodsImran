export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center py-24 px-4">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 rounded-full border-2 border-brand border-t-transparent animate-spin"
          aria-hidden
        />
        <p className="text-sm text-text-muted">Loading…</p>
      </div>
    </div>
  );
}
