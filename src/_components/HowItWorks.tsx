"use client";

/**
 * How It Works - home section
 * ------------------------------------------------------------
 * Rewritten in the site design system: a dark rounded panel with an
 * amber eyebrow and numbered step cards, matching the "how we work"
 * strips on the Programs and Services pages.
 */

import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Reach out",
    body: "Tell us whether you're here to learn or to build. A quick message is all it takes to start.",
  },
  {
    n: "02",
    title: "We map it out",
    body: "For learners, we point you to the right track. For businesses, we scope the work and give you a clear price.",
  },
  {
    n: "03",
    title: "Build together",
    body: "Students build in every session. Clients get progress in the open, no black boxes and no guesswork.",
  },
  {
    n: "04",
    title: "Ship and grow",
    body: "A finished project to show, or working software you own and can run. Either way, you leave with something real.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const HowItWorks = () => {
  return (
    <section className="bg-[#F3F1EA] px-5 py-16 md:px-10 md:py-24">
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-[#11142B] px-6 py-14 md:px-14 md:py-20"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#FFB627]">
            How it works
          </span>
          <h2 className="mt-4 text-3xl font-medium text-white sm:text-4xl">
            From first message to finished work.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/55">
            The same simple path whether you&apos;re enrolling a young builder or
            starting a business project.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl bg-white/[0.04] p-8 ring-1 ring-white/10"
            >
              <span className="font-mono text-sm text-[#FFB627]">{step.n}</span>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
