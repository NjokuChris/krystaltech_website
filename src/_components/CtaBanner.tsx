"use client";

/**
 * CtaBanner - the single call-to-action block used across the site.
 * ------------------------------------------------------------
 * One layout, reused everywhere:
 *   - Amber panel, headline + supporting line on the left
 *   - Primary (dark pill) and optional secondary (outline pill) actions
 *   - Optional image on the right (hidden when no image is passed)
 *
 * Design system: #F3F1EA sand, #11142B ink, #FFB627 amber.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

type Action = {
  label: string;
  href: string;
};

type CtaBannerProps = {
  title: string;
  body?: string;
  primary?: Action;
  secondary?: Action;
  image?: string;
  imageAlt?: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function CtaBanner({
  title,
  body,
  primary = { label: "Get in touch", href: "/contact" },
  secondary,
  image,
  imageAlt = "",
}: CtaBannerProps) {
  return (
    <section className="bg-[#F3F1EA] px-5 py-16 md:px-10 md:py-24">
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.7 }}
        className={`mx-auto grid max-w-[1400px] grid-cols-1 overflow-hidden rounded-[36px] bg-[#FFB627] ${
          image ? "md:grid-cols-[1.2fr_0.8fr]" : ""
        }`}
      >
        <div className="flex flex-col justify-center p-8 md:p-14">
          <h2 className="max-w-md text-3xl font-semibold text-[#11142B] sm:text-4xl">
            {title}
          </h2>
          {body ? (
            <p className="mt-4 max-w-md text-[#11142B]/70">{body}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={primary.href}
              className="flex items-center gap-2 rounded-full bg-[#11142B] px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {primary.label} <FiArrowRight className="text-xs" />
            </Link>
            {secondary ? (
              <Link
                href={secondary.href}
                className="rounded-full border border-[#11142B]/25 px-7 py-3 text-sm font-semibold text-[#11142B] transition-colors hover:bg-[#11142B]/5"
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>

        {image ? (
          <div className="relative min-h-[260px] w-full">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
