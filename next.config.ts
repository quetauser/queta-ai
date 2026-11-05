import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No redirects while the Coming Soon gate is on. The old
  // /solutions/office-manager -> /#solutions redirect is paused so that
  // path is served in place. Restore it when removing src/middleware.ts.
  async redirects() {
    return [];
  },
};

export default nextConfig;
