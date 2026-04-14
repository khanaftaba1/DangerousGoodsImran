import axios from "axios";
import { getPublicApiBase } from "./api-base";

/** Client-side API (auth, checkout, etc.). Server Components use `@/lib/catalog` / `server-api`. */
const api = axios.create({
  baseURL: getPublicApiBase(),
  withCredentials: true,
});

export default api;
