import { absoluteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: absoluteUrl(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/quiz"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
