import { getServerApiBases } from "./api-base";

/** Keep SSR responsive when the API is slow or unreachable. */
const FETCH_TIMEOUT_MS = Number(process.env.API_FETCH_TIMEOUT_MS || "2000");

/**
 * Low-level JSON fetch. Returns null if all bases fail or response is not OK.
 * Catalog pages use `catalog.ts`, which maps failures to empty lists or null detail.
 */
export async function fetchAPI<T>(path: string): Promise<T | null> {
  const p = path.startsWith("/") ? path : `/${path}`;
  for (const base of getServerApiBases()) {
    const url = `${base.replace(/\/$/, "")}${p}`;
    try {
      const res = await fetch(url, {
        cache: "no-store",
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (!res.ok) continue;
      const json = (await res.json()) as { data?: T };
      if (json?.data !== undefined) return json.data;
    } catch {
      continue;
    }
  }
  return null;
}
