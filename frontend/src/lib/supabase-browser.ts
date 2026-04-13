import { createBrowserClient } from "@supabase/ssr";

/**
 * OAuth PKCE state is stored in cookies (not localStorage). The Route Handler
 * at `app/auth/callback/route.ts` exchanges the `code` using the server client,
 * which reads those same cookies via `next/headers`.
 */
export function createSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set"
    );
  }
  return createBrowserClient(url, anon);
}
