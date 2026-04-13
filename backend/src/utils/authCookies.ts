import type { Request, Response } from 'express';

export const ACCESS_TOKEN_COOKIE = 'sb-access-token';
export const REFRESH_TOKEN_COOKIE = 'sb-refresh-token';

/** Cookie or `Authorization: Bearer` (SPA fallback when cross-origin cookies fail). */
export function getAccessTokenFromRequest(req: Request): string | undefined {
  const auth = req.headers.authorization;
  if (typeof auth === 'string' && auth.startsWith('Bearer ')) {
    const t = auth.slice(7).trim();
    if (t) return t;
  }
  const c = req.cookies?.[ACCESS_TOKEN_COOKIE];
  return typeof c === 'string' && c.length > 0 ? c : undefined;
}

const secure = process.env.NODE_ENV === 'production';

export function setSessionCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
  accessExpiresInSeconds: number
): void {
  res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: accessExpiresInSeconds * 1000,
  });
  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30 * 1000,
  });
}

export function clearSessionCookies(res: Response): void {
  res.clearCookie(ACCESS_TOKEN_COOKIE, { path: '/' });
  res.clearCookie(REFRESH_TOKEN_COOKIE, { path: '/' });
}
