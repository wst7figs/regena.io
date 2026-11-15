import type { NextConfig } from "next";

// v1 pages that sold the retired regenerative/longevity positioning now point at the v2 homepage.
const retired = ["/solutions", "/solutions/:path*", "/approach", "/clinics", "/outcomes", "/quiz"];

const nextConfig: NextConfig = {
  agentRules: false,
  reactStrictMode: true,
  async redirects() {
    return retired.map((source) => ({ source, destination: "/", permanent: false }));
  },
};

export default nextConfig;
