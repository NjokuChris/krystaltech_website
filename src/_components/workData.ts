/**
 * Shared portfolio content. Home section shows a few; /work lists all.
 */

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "Website" | "Mobile App" | "Branding" | "Security";
  summary: string;
  image: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "riverside-pharmacy",
    title: "A storefront that takes orders after hours",
    client: "Riverside Pharmacy",
    category: "Website",
    summary:
      "An online catalogue and order form for a Port Harcourt pharmacy, so regulars can reserve stock before they arrive. Loads fast on mobile data.",
    image: "/software-developer.jpg",
    tags: ["Next.js", "Responsive", "Payments"],
  },
  {
    slug: "delta-logistics-app",
    title: "Tracking deliveries without the phone calls",
    client: "Delta Logistics",
    category: "Mobile App",
    summary:
      "A driver and dispatch app that replaced a WhatsApp group. Real-time status, proof of delivery photos, and a simple daily summary.",
    image: "/pc-setup.png",
    tags: ["React Native", "Realtime", "Maps"],
  },
  {
    slug: "greenfield-schools-brand",
    title: "A brand a school could grow into",
    client: "Greenfield Schools",
    category: "Branding",
    summary:
      "Logo, colours, and a full stationery set for a growing private school. Everything from the gate signage to the report card header.",
    image: "/ui1.jpg",
    tags: ["Logo", "Print", "Guidelines"],
  },
  {
    slug: "harbour-realty-site",
    title: "Listings that actually load on 3G",
    client: "Harbour Realty",
    category: "Website",
    summary:
      "A property listing site tuned for slow connections, with image compression and search that works before the whole page finishes loading.",
    image: "/the-dev.jpg",
    tags: ["Performance", "Search", "SEO"],
  },
  {
    slug: "market-mama-app",
    title: "A shop that fits in a trader's pocket",
    client: "Market Mama",
    category: "Mobile App",
    summary:
      "A lightweight selling app for a market trader, built to run on entry-level Android phones with an offline-first cart.",
    image: "/hero-image.jpg",
    tags: ["Android", "Offline-first", "Lightweight"],
  },
  {
    slug: "coastal-clinic-security",
    title: "Locking down patient records",
    client: "Coastal Clinic",
    category: "Security",
    summary:
      "A security review and hardening pass for a clinic's booking system, closing the gaps that put patient data at risk.",
    image: "/bg-1.jpg",
    tags: ["Audit", "Hardening", "Backups"],
  },
];
