/**
 * Browser-facing API base (must match how you open the site: use `localhost` with
 * `http://localhost:3000`, not `127.0.0.1`, or httpOnly cookies from sign-in won’t stick).
 */
export { getPublicApiBase as getApiBase } from "./api-base";
