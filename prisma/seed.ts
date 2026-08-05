import { PrismaClient } from "@prisma/client";
import { posts } from "../src/_components/blogData";
import { projects } from "../src/_components/workData";

const db = new PrismaClient();

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

  // ── Team members ────────────────────────────────────────────────────────────
  console.log("Seeding team members...");

  await db.teamMember.upsert({
    where: { id: "seed-chris" },
    update: {},
    create: {
      id: "seed-chris",
      name: "Njoku Chris",
      role: "Founder & Lead Mentor",
      bio: "Chris started Krystal Tech Hub to give curious young people a real workshop instead of another classroom. He splits his week between teaching cohorts and shipping client work, and keeps the two close on purpose — what the studio learns on Friday shows up in the lesson on Monday.",
      image: "/Njoku_chris.jpg",
      order: 0,
      published: true,
    },
  });

  await db.teamMember.upsert({
    where: { id: "seed-bigc" },
    update: {},
    create: {
      id: "seed-bigc",
      name: "Chihurumnanya Nwachukwu",
      role: "IT Administrator",
      bio: "Handles tutoring, development and operations at Krystal Tech Hub. Builds and maintains the systems that keep the studio and classroom running, and mentors the next set of builders from first principles to production.",
      image: "https://avatars.githubusercontent.com/u/196318939?v=4",
      order: 1,
      published: true,
    },
  });

  console.log("Seeded 2 team members.");

  // ── Projects ─────────────────────────────────────────────────────────────
  console.log("Seeding projects...");
  for (const p of projects) {
    await db.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        client: p.client,
        category: p.category,
        summary: p.summary,
        image: p.image,
        tags: p.tags,
        published: true,
      },
    });
  }
  console.log(`Seeded ${projects.length} projects.`);
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
