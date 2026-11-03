import type { MetadataRoute } from "next";

const baseUrl = "https://1minconvert.com";

const routes = [
  "",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/tools/heic-to-jpg",
  "/tools/webp-converter",
  "/tools/image-compressor",
  "/tools/image-resizer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "monthly",
  }));
}