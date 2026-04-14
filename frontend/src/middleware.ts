import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Supabase sometimes redirects to **Site URL** (`/`) with `?code=` if the
 * requested `redirectTo` is not in the project's allowed Redirect URLs, or
 * when only the root is configured. Forward OAuth params to `/auth/callback`
 * so PKCE exchange runs as intended.
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  if (
    pathname === "/" &&
    (searchParams.has("code") || searchParams.has("error"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/callback";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
