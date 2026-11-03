import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
const baseUrl = "https://1minconvert.com";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/contact", "/privacy", "/terms", ...tools.map(tool => `/tools/${tool.slug}`)].map(route => ({url: `${baseUrl}${route}`}));
}
