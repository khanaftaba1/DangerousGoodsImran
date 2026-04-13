import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Exchange OAuth `code` on the server so PKCE cookies are visible to
 * `createServerClient`. Pass the **code** string — not the full URL (see Supabase
 * Google OAuth + Next.js App Router docs).
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const err = url.searchParams.get("error");
  const origin = url.origin;

  if (err) {
    return NextResponse.redirect(new URL(`/?error=auth`, origin));
  }

  if (!code) {
    return NextResponse.redirect(new URL(`/?error=auth`, origin));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth/callback]", error.message);
    return NextResponse.redirect(new URL(`/?error=auth`, origin));
  }

  return NextResponse.redirect(new URL("/auth/complete", origin));
}
