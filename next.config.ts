import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/solutions/office-manager",
        destination: "/#solutions",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
