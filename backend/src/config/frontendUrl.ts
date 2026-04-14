/**
 * `FRONTEND_URL` may list several comma-separated origins (e.g. Vercel production
 * + preview). CORS allows all; OAuth redirects use the first entry only.
 */
export function getPrimaryFrontendUrl(): string {
  const raw = process.env.FRONTEND_URL || "http://localhost:3000";
  const first = raw.split(",")[0]?.trim() || raw;
  return first.replace(/\/$/, "");
}

export function getCorsAllowedOrigins(): string[] {
  const raw = process.env.FRONTEND_URL?.trim();
  const fromEnv = raw
    ? raw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  return [
    ...new Set([
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      ...fromEnv,
    ]),
  ];
}
