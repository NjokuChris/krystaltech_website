"use client";

/**
 * DeviceCTABanner - Krystal Tech Hub
 * ------------------------------------------------------------
 * The ONE call-to-action block used everywhere in the app. Every
 * instance shares the exact same visual treatment - background color,
 * device image, glow, layout. The ONLY things that change per use are
 * the text (heading + description) and the CTA buttons.
 *
 * Shared visual treatment:
 *   - Fixed amber card that KEEPS its rounded shape (no overflow-hidden
 *     on the card). A wrapping <section> clips horizontally instead, so
 *     the device escapes the card while the corners stay crisp.
 *   - The device mockup is absolutely positioned with a negative top
 *     offset so it genuinely breaks past the card's top edge - a
 *     "popping out of frame" effect (not object-fit cropping).
 *   - A soft semi-circle glow sits directly behind the device, centered
 *     on it. z-order: background -> circle -> device image.
 *
 * To add a CTA: add a text/button entry to ctaConfigs.ts and render
 * <DeviceCTABanner {...ctaConfigs.KEY} />. Never duplicate markup, and
 * never change the background or image - those are locked here on purpose.
 *
 * Design system: #F3F1EA sand, #11142B ink, #FFB627 amber.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export type CtaAction = {
  label: string;
  href: string;
};

// The only per-instance variation allowed: text + buttons.
export type DeviceCTABannerProps = {
  heading: string;
  description: string;
  primaryCta: CtaAction;
  secondaryCta?: CtaAction;
};

// Locked visual constants - identical for every CTA across the app.
const BACKGROUND = "#FFB627";
const DEVICE_IMAGE = { src: "/pc-setup.png", alt: "Krystal Tech Hub setup" };
const GLOW = "rgba(0,0,0,0.10)"; // soft dark spotlight on the amber card

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function DeviceCTABanner({
  heading,
  description,
  primaryCta,
  secondaryCta,
}: DeviceCTABannerProps) {
  return (
    // Wrapping section clips horizontally (no page-level side-scroll from
    // the escaping device) while leaving vertical room for the overflow.
    <section className="relative w-full overflow-x-clip bg-[#F3F1EA] px-5 py-16 md:px-10 md:py-24">
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.7 }}
        // NOTE: no overflow-hidden here - the card keeps its rounded shape
        // and the device is free to break past its edges.
        className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-8 rounded-[36px] px-8 pb-10 pt-40 md:min-h-[320px] md:flex-row md:gap-6 md:px-14 md:pb-14 md:pt-14"
        style={{ background: BACKGROUND }}
      >
        {/* ---- text block ---- */}
        <div className="relative z-30 flex w-full flex-col items-center text-center text-[#11142B] md:w-[55%] md:items-start md:text-left">
          <h2 className="max-w-md text-3xl font-semibold sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-md text-[#11142B]/70">{description}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              href={primaryCta.href}
              className="flex items-center gap-2 rounded-full bg-[#11142B] px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {primaryCta.label} <FiArrowRight className="text-xs" />
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="rounded-full border border-[#11142B]/25 px-7 py-3 text-sm font-semibold text-[#11142B] transition-colors hover:bg-[#11142B]/5"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>

        {/* ---- device zone (glow + overflowing image) ---- */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center md:relative md:inset-auto md:top-auto md:z-auto md:order-2 md:w-[45%]">
          <div className="relative flex w-full max-w-[320px] justify-center md:max-w-none">
            {/* semi-circle glow - sits BEHIND the device (z-10), centered on it */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
              style={{ background: GLOW }}
            />

            {/* device image - breaks past the top edge via negative offset,
                sits ON TOP of the glow (z-20) */}
            <div className="relative z-20 -mt-24 w-[220px] sm:w-[260px] md:-mt-16 md:mb-[-3.5rem] md:w-[300px] lg:w-[340px]">
              <Image
                src={DEVICE_IMAGE.src}
                alt={DEVICE_IMAGE.alt}
                width={680}
                height={680}
                sizes="(max-width: 768px) 260px, 340px"
                className="h-auto w-full object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
