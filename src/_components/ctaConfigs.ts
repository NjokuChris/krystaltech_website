/**
 * ctaConfigs - Krystal Tech Hub
 * ------------------------------------------------------------
 * One entry per CTA banner used across the app. Each entry holds ONLY
 * the text and the buttons - the background color, device image, glow
 * and layout are locked inside DeviceCTABanner and identical everywhere.
 *
 * Add a CTA by adding an entry here, then render
 * <DeviceCTABanner {...ctaConfigs.KEY} />. Never duplicate markup.
 */

import type { DeviceCTABannerProps } from "@/_components/DeviceCTABanner";

export const ctaConfigs = {
  // Home (Extra section) - learn or build
  home: {
    heading: "Ready to learn, or ready to build?",
    description:
      "Enrol a young builder in a program, or bring us a project for your business. Either way, it starts with a quick conversation.",
    primaryCta: { label: "Explore programs", href: "/programs" },
    secondaryCta: { label: "See our services", href: "/services" },
  },

  // Work page - start a project
  work: {
    heading: "Have a project in mind?",
    description:
      "Tell us what you're building. We'll scope it honestly and tell you what it takes, no jargon and no surprise invoices.",
    primaryCta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "See our services", href: "/services" },
  },

  // Blog page - newsletter / stay in touch
  blog: {
    heading: "Want updates when we publish?",
    description:
      "Drop your email and we'll send a note when a new post goes up. No spam, just the occasional useful thing.",
    primaryCta: { label: "Get in touch", href: "/contact" },
    secondaryCta: { label: "About the hub", href: "/about" },
  },

  // Services page - have something to build
  services: {
    heading: "Have something to build?",
    description:
      "Tell us what you're working on and where you want it to go. We'll come back with a plan, a timeline and a price.",
    primaryCta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "About the hub", href: "/about" },
  },

  // About page - come see the hub
  about: {
    heading: "Come see the hub for yourself.",
    description:
      "Whether it's enrolling a young builder or starting a project, we'd love to talk.",
    primaryCta: { label: "Explore programs", href: "/programs" },
    secondaryCta: { label: "Get in touch", href: "/contact" },
  },

  // Programs page - reserve a seat
  programs: {
    heading: "Seats fill fast each term.",
    description:
      "Tell us the learner's age and what they're curious about, and we'll point you to the right track and the next start date.",
    primaryCta: { label: "Reserve a seat", href: "/contact" },
    secondaryCta: { label: "About the hub", href: "/about" },
  },
} satisfies Record<string, DeviceCTABannerProps>;

export type CtaConfigKey = keyof typeof ctaConfigs;
