/**
 * Shared blog content. The home section shows the first few; the /blog
 * page lists them all. Keeping one source means both stay in sync.
 */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Tech Hub" | "Service Hub" | "Guides";
  date: string;
  readTime: string;
  image: string;
};

export const posts: Post[] = [
  {
    slug: "why-we-teach-kids-to-build-not-memorise",
    title: "Why we teach kids to build, not memorise",
    excerpt:
      "Our students leave a term with something they made, a game, a site, a robot. Here is how project-first teaching actually plays out in our Port Harcourt classroom.",
    category: "Tech Hub",
    date: "12 July 2026",
    readTime: "5 min read",
    image: "/hero-image.jpg",
  },
  {
    slug: "what-a-good-business-website-costs-in-nigeria",
    title: "What a good business website really costs in Nigeria",
    excerpt:
      "Hosting, domains, maintenance, the real numbers behind a site that loads fast on local networks and does not fall over when traffic comes.",
    category: "Service Hub",
    date: "28 June 2026",
    readTime: "7 min read",
    image: "/software-developer.jpg",
  },
  {
    slug: "getting-your-first-tech-job-from-port-harcourt",
    title: "Getting your first tech job from Port Harcourt",
    excerpt:
      "You do not need to relocate to Lagos. A practical look at portfolios, remote work, and the skills local employers actually ask for.",
    category: "Guides",
    date: "9 June 2026",
    readTime: "6 min read",
    image: "/the-dev.jpg",
  },
  {
    slug: "scratch-to-python-a-learning-path-for-teens",
    title: "Scratch to Python: a learning path for teens",
    excerpt:
      "How younger students move from drag-and-drop blocks to writing real code, and why the jump is smaller than most parents expect.",
    category: "Tech Hub",
    date: "22 May 2026",
    readTime: "4 min read",
    image: "/ui1.jpg",
  },
  {
    slug: "five-signs-your-small-business-needs-an-app",
    title: "Five signs your small business is ready for an app",
    excerpt:
      "Not every business needs a mobile app. Here are the honest signals that tell you when it is worth the investment, and when a website is enough.",
    category: "Service Hub",
    date: "3 May 2026",
    readTime: "6 min read",
    image: "/pc-setup.png",
  },
  {
    slug: "keeping-your-business-safe-online",
    title: "Keeping your business safe online without a security team",
    excerpt:
      "Simple, practical steps any small business can take to avoid the most common attacks, no jargon and no expensive tools required.",
    category: "Service Hub",
    date: "18 April 2026",
    readTime: "8 min read",
    image: "/bg-1.jpg",
  },
];
