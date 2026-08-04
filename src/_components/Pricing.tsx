"use client";

/**
 * PricingSection — Krystal Tech Hub / Cymentic
 * ------------------------------------------------------------
 * Stack: Next.js (App Router) + TypeScript + Tailwind + Framer Motion + react-icons
 *
 * A service switcher (pill tabs) up top, three pricing tiers per
 * service below, and a discounts + fine-print strip at the bottom.
 * Designed to be dropped into the services page as one section, or
 * used as the hero content of a dedicated /pricing page.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiGlobe,
  FiSmartphone,
  FiPenTool,
  FiTrendingUp,
  FiShield,
} from "react-icons/fi";

// ---------------------------------------------------------------
// Content
// ---------------------------------------------------------------

type Tier = {
  name: string;
  price: string;
  period?: string; // e.g. "one-time", "/month"
  tagline: string;
  features: string[];
  highlight?: boolean;
};

type Service = {
  key: string;
  label: string; // tab label
  icon: React.ElementType;
  intro: string;
  tiers: Tier[];
  note?: string; // small print specific to this service
};

const SERVICES: Service[] = [
  {
    key: "web",
    label: "Website Development",
    icon: FiGlobe,
    intro:
      "Fast, responsive sites that load well on Nigerian networks and turn visitors into customers.",
    tiers: [
      {
        name: "Landing page",
        price: "₦150,000",
        period: "one-time",
        tagline: "A single page to establish credibility fast.",
        features: [
          "1 responsive page",
          "Contact form",
          "Domain + SSL setup",
          "3-day delivery",
        ],
      },
      {
        name: "Business site",
        price: "₦350,000",
        period: "one-time",
        tagline: "Everything a growing business needs online.",
        features: [
          "Up to 6 pages",
          "Content you can edit yourself",
          "Hosting, domain and SSL setup",
          "Basic SEO setup",
          "1 month of free support",
        ],
        highlight: true,
      },
      {
        name: "Full platform",
        price: "From ₦700,000",
        period: "project-based",
        tagline: "Custom features — bookings, dashboards, payments.",
        features: [
          "Unlimited pages",
          "Custom features (booking, payments, etc.)",
          "Admin dashboard",
          "3 months of free support",
        ],
      },
    ],
    note: "Quoted per project after a short discovery call — final price depends on scope.",
  },
  {
    key: "mobile",
    label: "Mobile App Development",
    icon: FiSmartphone,
    intro:
      "Android and cross-platform apps built to feel quick and simple, from prototype to store release.",
    tiers: [
      {
        name: "Prototype",
        price: "₦400,000",
        period: "one-time",
        tagline: "A clickable prototype to test your idea.",
        features: [
          "Core screens designed",
          "Interactive prototype",
          "User flow document",
        ],
      },
      {
        name: "MVP app",
        price: "From ₦1,200,000",
        period: "project-based",
        tagline: "A working app ready for real users.",
        features: [
          "Android + cross-platform build",
          "Backend and database setup",
          "Clean, tested UX",
          "1 round of revisions",
        ],
        highlight: true,
      },
      {
        name: "Store-ready release",
        price: "From ₦2,000,000",
        period: "project-based",
        tagline: "Full build plus submission support.",
        features: [
          "Everything in MVP",
          "Play Store submission support",
          "Push notifications",
          "3 months of free support",
        ],
      },
    ],
    note: "Apple App Store submission is available as an add-on where required.",
  },
  {
    key: "design",
    label: "Graphic Design",
    icon: FiPenTool,
    intro:
      "Logos, brand kits and the everyday graphics a business runs on — visuals that stay consistent and get recognised.",
    tiers: [
      {
        name: "Logo only",
        price: "₦60,000",
        period: "one-time",
        tagline: "A clean, versatile logo, delivered fast.",
        features: [
          "3 initial concepts",
          "2 rounds of revisions",
          "Final files (PNG, SVG, PDF)",
        ],
      },
      {
        name: "Brand starter kit",
        price: "₦150,000",
        period: "one-time",
        tagline: "Logo plus the essentials to look consistent.",
        features: [
          "Logo and brand identity",
          "Color palette and typography",
          "Social media templates (10)",
          "Brand style guide",
        ],
        highlight: true,
      },
      {
        name: "Monthly design support",
        price: "₦80,000",
        period: "/month",
        tagline: "Ongoing graphics without hiring in-house.",
        features: [
          "Up to 12 graphics per month",
          "Social media and print graphics",
          "2-day average turnaround",
        ],
      },
    ],
  },
  {
    key: "marketing",
    label: "Online Marketing",
    icon: FiTrendingUp,
    intro:
      "Campaigns that reach the right people and bring traffic that actually converts — built on numbers, not guesswork.",
    tiers: [
      {
        name: "Starter",
        price: "₦100,000",
        period: "/month",
        tagline: "Get consistent, on-brand content out.",
        features: [
          "Content calendar (12 posts)",
          "Community management",
          "Monthly performance report",
        ],
      },
      {
        name: "Growth",
        price: "₦250,000",
        period: "/month",
        tagline: "Content plus paid campaigns to drive traffic.",
        features: [
          "Everything in Starter",
          "Social and search ad campaigns",
          "Creative built for each campaign",
          "Bi-weekly reporting call",
        ],
        highlight: true,
      },
      {
        name: "Full funnel",
        price: "From ₦450,000",
        period: "/month",
        tagline: "Content, ads and conversion tracking together.",
        features: [
          "Everything in Growth",
          "Landing page optimisation",
          "Conversion tracking setup",
          "Weekly reporting",
        ],
      },
    ],
    note: "Ad spend is billed separately from the management fee.",
  },
  {
    key: "security",
    label: "Cyber Security",
    icon: FiShield,
    intro:
      "Practical protection for your site, data and users — finding the weak spots before someone else does.",
    tiers: [
      {
        name: "Security review",
        price: "₦120,000",
        period: "one-time",
        tagline: "A full audit and a clear list of fixes.",
        features: [
          "Full security review",
          "Written report of vulnerabilities",
          "Prioritised fix recommendations",
        ],
      },
      {
        name: "Hardening + backups",
        price: "₦220,000",
        period: "one-time",
        tagline: "We fix what we find, then set up recovery.",
        features: [
          "Everything in Security review",
          "Security hardening implemented",
          "Backup and recovery plan set up",
        ],
        highlight: true,
      },
      {
        name: "Ongoing monitoring",
        price: "₦60,000",
        period: "/month",
        tagline: "Continuous watch, so issues get caught early.",
        features: [
          "Continuous monitoring",
          "Monthly security report",
          "Priority response to incidents",
        ],
      },
    ],
  },
];

const DISCOUNTS = [
  {
    title: "Bundle 2+ services",
    detail: "Save 10% when you combine any two services in one package.",
  },
  {
    title: "Annual prepay",
    detail:
      "Pay for 12 months upfront on any monthly plan and get 2 months free.",
  },
  {
    title: "Startups & NGOs",
    detail:
      "15% off project-based work for registered startups and non-profits.",
  },
  {
    title: "Referral credit",
    detail: "Refer a client and get ₦20,000 credit once their project starts.",
  },
];

// ---------------------------------------------------------------
// Section
// ---------------------------------------------------------------

export default function PricingSection() {
  const [active, setActive] = useState(SERVICES[0].key);
  const service = SERVICES.find((s) => s.key === active)!;

  return (
    <section className="bg-[#F3F1EA] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* header */}
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#92600a]">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#11142B] sm:text-4xl">
            Clear pricing, no surprises.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#11142B]/60">
            Pick a service below to see what's included at each tier. Every
            price is a starting point — final quotes depend on your specific
            needs.
          </p>
        </div>

        {/* service tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            const isActive = s.key === active;
            return (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-[#11142B] bg-[#11142B] text-white"
                    : "border-[#11142B]/10 bg-white text-[#11142B]/70 hover:border-[#11142B]/30"
                }`}
              >
                <Icon className="text-base" />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* active service intro */}
        <AnimatePresence mode="wait">
          <motion.p
            key={service.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-[#11142B]/60"
          >
            {service.intro}
          </motion.p>
        </AnimatePresence>

        {/* tiers */}
        <AnimatePresence mode="wait">
          <motion.div
            key={service.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {service.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-3xl border p-8 ${
                  tier.highlight
                    ? "border-2 border-[#92600a] bg-white"
                    : "border-[#11142B]/8 bg-white"
                }`}
              >
                {tier.highlight && (
                  <span className="mb-4 w-fit rounded-full bg-[#FFB627]/20 px-3 py-1 text-xs font-semibold text-[#92600a]">
                    Most popular
                  </span>
                )}

                <h3 className="text-lg font-semibold text-[#11142B]">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#11142B]/60">
                  {tier.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#11142B]">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm text-[#11142B]/50">
                      {tier.period}
                    </span>
                  )}
                </div>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <FiCheck className="mt-0.5 flex-shrink-0 text-[#92600a]" />
                      <span className="text-sm text-[#11142B]/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                    tier.highlight
                      ? "bg-[#11142B] text-white hover:bg-[#11142B]/90"
                      : "border border-[#11142B]/15 text-[#11142B] hover:bg-[#11142B]/5"
                  }`}
                >
                  Get started
                </button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {service.note && (
          <p className="mt-4 text-xs text-[#11142B]/45">* {service.note}</p>
        )}

        {/* discounts + fine print */}
        <div className="mt-16 rounded-3xl bg-[#11142B] p-8 sm:p-10">
          <h3 className="text-lg font-semibold text-white">
            Discounts and how to save
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {DISCOUNTS.map((d) => (
              <div key={d.title} className="flex gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#FFB627]" />
                <div>
                  <p className="text-sm font-semibold text-white">{d.title}</p>
                  <p className="mt-1 text-sm text-white/60">{d.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-xs leading-relaxed text-white/45">
              All prices are in Naira and exclude third-party costs such as
              domain renewals, ad spend, and app store fees. Project-based work
              requires a 50% deposit to begin, with the balance due on delivery.
              Monthly plans are billed in advance and can be cancelled with 30
              days' notice. Prices last reviewed August 2026 and are subject to
              change for new clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
