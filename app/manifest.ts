import { siteConfig } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F3ECD3",
    theme_color: "#D9A441",
    icons: [
      {
        src: siteConfig.icon,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: siteConfig.icon,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
