import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 py-24">
      <h1 className="text-6xl font-bold text-text-dark">404</h1>
      <p className="text-xl text-text-muted">Page not found</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 text-white font-bold hover:bg-brand-dark transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
