/**
 * Single place for the Express API base URL (must include `/api`).
 *
 * - Browser / shared: `NEXT_PUBLIC_API_URL` (inlined at build for the client).
 * - SSR only: `API_URL` — should match the public URL in production (see `.env.example`).
 *
 * When unset, local dev defaults apply (see `DEFAULT_API_BASE`).
 */
const DEFAULT_API_BASE = "http://localhost:5000/api";

function normalizeBase(url: string): string {
  return url.replace(/\/$/, "");
}

/** Client-side and any code that should use the same URL as the browser bundle. */
export function getPublicApiBase(): string {
  return normalizeBase(process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE);
}

/**
 * Server-side catalog/API fetches: prefer `API_URL`, then `NEXT_PUBLIC_API_URL`,
 * then local defaults. Multiple entries only when env vars disagree or for dev
 * hostname fallbacks.
 */
export function getServerApiBases(): string[] {
  const explicit = [process.env.API_URL, process.env.NEXT_PUBLIC_API_URL].filter(
    (b): b is string => typeof b === "string" && b.trim() !== ""
  );

  if (explicit.length > 0) {
    return [...new Set(explicit.map(normalizeBase))];
  }

  return [
    normalizeBase(DEFAULT_API_BASE),
    normalizeBase("http://127.0.0.1:5000/api"),
  ];
}
