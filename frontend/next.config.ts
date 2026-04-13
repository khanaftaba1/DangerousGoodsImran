import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Monorepo: lockfile may live at repo root — pin Turbopack to this app directory.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lwfiles.mycourse.app",
      },
    ],
  },
};

export default nextConfig;
