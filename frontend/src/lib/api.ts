import axios from "axios";

/** Client-side API (auth, checkout, etc.). Server Components use `@/lib/catalog` / `server-api`. */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

export default api;
