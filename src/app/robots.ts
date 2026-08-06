import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/login", "/signup", "/invite/"],
      },
    ],
    sitemap: "https://www.krystaltechhub.com/sitemap.xml",
  };
}
