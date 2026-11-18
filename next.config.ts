import type { NextConfig } from "next";

// v1 pages that sold the retired regenerative/longevity positioning now point at the v2 homepage.
const retired = ["/solutions", "/solutions/:path*", "/approach", "/clinics", "/outcomes", "/quiz"];

const funnelOrigin = process.env.FUNNEL_ORIGIN ?? "https://regena-funnel.vercel.app";

const nextConfig: NextConfig = {
  agentRules: false,
  reactStrictMode: true,
  async redirects() {
    return retired.map((source) => ({ source, destination: "/", permanent: false }));
  },
  // The Meta ads funnel is its own Vercel project (regena-funnel, basePath /funnel), served here at regena.io/funnel.
  async rewrites() {
    return [
      { source: "/funnel", destination: `${funnelOrigin}/funnel` },
      { source: "/funnel/:path*", destination: `${funnelOrigin}/funnel/:path*` },
    ];
  },
};

export default nextConfig;
