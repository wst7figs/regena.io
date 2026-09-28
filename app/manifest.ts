import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Regena",
    short_name: "Regena",
    description: "Patient-growth infrastructure for regenerative and longevity clinics.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1eb",
    theme_color: "#0a1113",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
