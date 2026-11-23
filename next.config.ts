import type { NextConfig } from "next";

// v1 pages that sold the retired regenerative/longevity positioning now point at the v2 homepage.
const retired = ["/solutions", "/solutions/:path*", "/approach", "/clinics", "/outcomes", "/quiz"];

const nextConfig: NextConfig = {
  agentRules: false,
  reactStrictMode: true,
  async redirects() {
    return [
      ...retired.map((source) => ({ source, destination: "/", permanent: false })),
      // The Meta ads funnel moved to its own subdomain. Old regena.io/funnel links (ads, texts) forward there,
      // keeping any UTM/fbclid query string.
      { source: "/funnel", destination: "https://funnels.regena.io", permanent: false },
      { source: "/funnel/:path*", destination: "https://funnels.regena.io/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
