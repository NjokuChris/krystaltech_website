import { PrismaClient } from "@prisma/client";
import { posts } from "../src/_components/blogData";

const db = new PrismaClient();

// Give each seeded post a starter markdown body built from its excerpt,
// so the public /blog/[slug] pages render real content out of the box.
function starterContent(title: string, excerpt: string): string {
  return [
    `## ${title}`,
    "",
    excerpt,
    "",
    "_This post was imported from the original site content. Edit it in the admin to add the full article._",
  ].join("\n");
}

async function main() {
  console.log("Seeding posts...");
  for (const p of posts) {
    await db.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: starterContent(p.title, p.excerpt),
        category: p.category,
        image: p.image,
        readTime: p.readTime,
        published: true,
      },
    });
  }
  console.log(`Seeded ${posts.length} posts.`);

  // Seed the current "Happening Now" copy as the active announcement,
  // only if there is no announcement yet.
  const existing = await db.announcement.count();
  if (existing === 0) {
    await db.announcement.create({
      data: {
        eyebrow: "Happening now",
        title: "Summer Coding Camp is open for enrollment",
        body:
          "A few weeks, small cohorts, real projects - kids leave with a website or app they actually built, not just a certificate. Spots are limited and filling up fast.",
        primaryLabel: "Reserve a seat",
        primaryHref: "/contact",
        secondaryLabel: "See camp details",
        secondaryHref: "/programs",
        active: true,
      },
    });
    console.log("Seeded active announcement.");
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
