"use client";

/**
 * Pricing - Krystal Tech Hub
 * ------------------------------------------------------------
 * Dedicated pricing page in the site design system:
 *   - #F3F1EA sand, #11142B ink, #FFB627 amber
 *   - Hero, then the shared PricingSection (service switcher + tiers
 *     + discounts), then a CTA
 *   - Reuses PricingSection so prices live in one place.
 */

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import NavBar from "@/_components/NavBar";
import Footer from "@/_components/Footer";
import PricingSection from "@/_components/Pricing";
import DeviceCTABanner from "@/_components/DeviceCTABanner";
import { ctaConfigs } from "@/_components/ctaConfigs";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function PricingPage() {
  return (
    <main className="bg-[#F3F1EA] font-sans text-[#11142B]">
      <NavBar />

      {/* ---------------------------------------------------------- hero */}
      <section className="px-5 pb-6 pt-16 md:px-10 md:pb-8 md:pt-24">
        <div className="mx-auto max-w-[1400px]">
          <motion.span
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-[#11142B]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#11142B]/50"
          >
            Pricing
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 max-w-3xl text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl"
          >
            Fair prices,
            <br />
            <span className="font-semibold">told to you upfront.</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-xl text-base text-[#11142B]/60 sm:text-lg"
          >
            Every price below is a starting point. Pick a service to see what
            each tier includes, then talk to us for a firm quote built around
            what you actually need.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#pricing"
              className="flex items-center gap-2 rounded-full bg-[#11142B] px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              See the tiers <FiArrowRight className="text-xs" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- tiers */}
      <div id="pricing" className="scroll-mt-24">
        <PricingSection />
      </div>

      {/* ---------------------------------------------------------- cta */}
      <DeviceCTABanner {...ctaConfigs.services} />

      <Footer />
    </main>
  );
}
