import type { MetadataRoute } from "next";
import { db } from "@/lib/prisma";

const BASE = "https://www.krystaltechhub.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/programs`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/work`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/team`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE}/pricing`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  // Dynamic blog posts
  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await db.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    postRoutes = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch { /* DB unavailable at build time — skip */ }

  // Dynamic project pages
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await db.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    projectRoutes = projects.map((p) => ({
      url: `${BASE}/work/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));
  } catch { /* DB unavailable at build time — skip */ }

  return [...staticRoutes, ...postRoutes, ...projectRoutes];
}
