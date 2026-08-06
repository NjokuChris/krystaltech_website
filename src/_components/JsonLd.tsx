/**
 * JsonLd — injects structured data (JSON-LD) into the page <head>.
 * Use the pre-built schemas below or pass any valid schema object.
 *
 * Usage:
 *   <JsonLd data={localBusinessSchema} />
 *   <JsonLd data={breadcrumbSchema([{ name: "Programs", url: "/programs" }])} />
 */

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EducationalOrganization"],
  name: "Krystal Tech Hub",
  alternateName: "Krystal Technologies",
  url: "https://www.krystaltechhub.com",
  logo: "https://www.krystaltechhub.com/krystal4.png",
  image: "https://www.krystaltechhub.com/krystal4.png",
  description:
    "Krystal Tech Hub trains young people in coding, design, robotics and more, and builds websites, apps and brands for businesses in Port Harcourt, Nigeria.",
  telephone: "+2348062442682",
  email: "support@krystaltechhub.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "54 Old Refinery Road, Elelenwo",
    addressLocality: "Port Harcourt",
    addressRegion: "Rivers State",
    addressCountry: "NG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 4.8156,
    longitude: 7.0498,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://x.com/krystal_teck",
    "https://web.facebook.com/Krystaltechnologyyooo",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tech Training Programs",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "ICT Fundamentals" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Web Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Graphic Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Robotics" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Intro to AI" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "UI/UX Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Video Editing" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Scratch Programming" } },
    ],
  },
};

export function breadcrumbSchema(
  crumbs: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.krystaltechhub.com" },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: `https://www.krystaltechhub.com${c.url}`,
      })),
    ],
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image.startsWith("http")
      ? post.image
      : `https://www.krystaltechhub.com${post.image}`,
    url: `https://www.krystaltechhub.com/blog/${post.slug}`,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: "Krystal Tech Hub",
      url: "https://www.krystaltechhub.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Krystal Tech Hub",
      logo: {
        "@type": "ImageObject",
        url: "https://www.krystaltechhub.com/krystal4.png",
      },
    },
  };
}

interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
