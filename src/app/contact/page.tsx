"use client";

/**
 * Contact - Krystal Tech Hub
 * ------------------------------------------------------------
 * Clean contact page in the site design system. Split layout:
 * contact details + map on the left, the adaptive Tech Hub /
 * Service Hub form on the right.
 */

import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";

import NavBar from "@/_components/NavBar";
import Footer from "@/_components/Footer";
import ContactForm from "@/_components/FormComp";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const DETAILS = [
  {
    Icon: FiPhone,
    label: "Call us",
    value: "+234 806 244 2682",
    href: "tel:+2348062442682",
  },
  {
    Icon: FiMail,
    label: "Email us",
    value: "support@krystaltechhub.com",
    href: "mailto:support@krystaltechhub.com",
  },
  {
    Icon: FiMapPin,
    label: "Visit us",
    value: "54 Old Refinery Road, Elelenwo, Port Harcourt, Rivers State",
  },
  {
    Icon: FiClock,
    label: "Open",
    value: "Monday to Saturday, 9am - 6pm",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-[#F3F1EA] font-sans text-[#11142B]">
      <NavBar />

      {/* hero */}
      <section className="px-5 pb-10 pt-16 md:px-10 md:pb-14 md:pt-24">
        <div className="mx-auto max-w-[1400px]">
          <motion.span
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-[#11142B]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#11142B]/50"
          >
            Get in touch
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 max-w-3xl text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl"
          >
            Let&apos;s talk about
            <br />
            <span className="font-semibold">learning or building.</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-xl text-base text-[#11142B]/60 sm:text-lg"
          >
            Enrolling a young builder or starting a business project? Pick the
            right hub below and tell us what you need. We usually reply within a
            day.
          </motion.p>
        </div>
      </section>

      {/* details + form */}
      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* left: details */}
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <div className="space-y-4">
              {DETAILS.map(({ Icon, label, value, href }) => {
                const content = (
                  <div className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-[#11142B]/[0.06] transition-shadow hover:shadow-lg hover:shadow-[#11142B]/5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFB627]/15 text-[#92600a]">
                      <Icon className="text-lg" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[#11142B]/45">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-[#11142B]">
                        {value}
                      </p>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={label} href={href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </div>

            {/* map */}
            <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-[#11142B]/[0.06]">
              <iframe
                title="Krystal Tech Hub location in Port Harcourt"
                src="https://www.google.com/maps?q=Elelenwo,+Port+Harcourt,+Rivers+State&output=embed"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* right: form */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
