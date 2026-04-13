const ACCESS = "dg_auth_access";
const REFRESH = "dg_auth_refresh";

export function setSessionTokens(access: string, refresh: string): void {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(ACCESS, access);
  sessionStorage.setItem(REFRESH, refresh);
}

export function clearSessionTokens(): void {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.removeItem(ACCESS);
  sessionStorage.removeItem(REFRESH);
}

export function getAccessToken(): string | null {
  if (typeof sessionStorage === "undefined") return null;
  return sessionStorage.getItem(ACCESS);
}

export function getRefreshToken(): string | null {
  if (typeof sessionStorage === "undefined") return null;
  return sessionStorage.getItem(REFRESH);
}

/** Use for browser calls to the Express API when cookies may not be sent cross-origin. */
export function getAuthFetchInit(init: RequestInit = {}): RequestInit {
  const headers = new Headers(init.headers);
  const access = getAccessToken();
  if (access) headers.set("Authorization", `Bearer ${access}`);
  return {
    ...init,
    headers,
    credentials: "include",
  };
}
