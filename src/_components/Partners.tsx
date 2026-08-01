"use client";

/**
 * Partners - logo strip above the footer.
 * ------------------------------------------------------------
 * There is no honest "stock company logo" service (real brand marks
 * would falsely imply a partnership), so these are neutral, generic
 * placeholder wordmarks: an icon + name in the site palette. Swap the
 * PARTNERS entries for your real partners' logos when you have them.
 */

import { motion } from "framer-motion";
import {
  FiHexagon,
  FiTriangle,
  FiOctagon,
  FiCircle,
  FiSquare,
  FiZap,
} from "react-icons/fi";

const PARTNERS = [
  { name: "NorthPeak", Icon: FiTriangle },
  { name: "Novacore", Icon: FiHexagon },
  { name: "Brightlab", Icon: FiZap },
  { name: "Orbit", Icon: FiCircle },
  { name: "Quadra", Icon: FiSquare },
  { name: "Octane", Icon: FiOctagon },
];

const Partners = () => {
  return (
    <section className="w-full bg-[#F3F1EA] py-16">
      {/* divider label */}
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-4 px-6 md:px-10">
        <div className="h-px w-full bg-[#11142B]/10" />
        <p className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.2em] text-[#11142B]/40">
          Trusted by teams we work with
        </p>
        <div className="h-px w-full bg-[#11142B]/10" />
      </div>

      {/* logo row */}
      <div className="mx-auto mt-10 grid max-w-[1400px] grid-cols-2 items-center gap-x-6 gap-y-8 px-6 sm:grid-cols-3 md:px-10 lg:grid-cols-6">
        {PARTNERS.map(({ name, Icon }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex items-center justify-center gap-2 text-[#11142B]/45 grayscale transition-all duration-300 hover:text-[#11142B] hover:grayscale-0"
          >
            <Icon className="text-2xl text-[#FFB627]" />
            <span className="text-lg font-semibold tracking-tight">{name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
