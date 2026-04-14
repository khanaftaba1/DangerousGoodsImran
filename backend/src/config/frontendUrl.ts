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

/**
 * When `CORS_ALLOW_VERCEL=1`, allow any `https://*.vercel.app` origin so **preview**
 * deployments (new URL per deploy) work without editing `FRONTEND_URL` each time.
 * Optional: keep off in production if you only use explicit `FRONTEND_URL` origins.
 */
export function isVercelPreviewOriginAllowed(origin: string): boolean {
  if (process.env.CORS_ALLOW_VERCEL !== "1") return false;
  try {
    const u = new URL(origin);
    return u.protocol === "https:" && u.hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

export function isCorsOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return true;
  if (getCorsAllowedOrigins().includes(origin)) return true;
  return isVercelPreviewOriginAllowed(origin);
}
