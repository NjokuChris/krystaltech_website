"use client";

/**
 * FloatingContact - Krystal Tech Hub
 * ------------------------------------------------------------
 * Fixed bottom-right contact dock using the site design system:
 *   - #11142B ink, #F3F1EA sand, #FFB627 amber, WhatsApp green
 *   - Two stacked action buttons (Call + WhatsApp)
 *   - On hover each button expands to reveal its label
 *   - Framer Motion entrance + spring hover interactions
 *
 * SETUP: npm install framer-motion react-icons
 * Update PHONE_NUMBER / WHATSAPP_NUMBER below with real values.
 */

import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

// digits only, international format (no +, spaces, or dashes) for the wa.me link
const WHATSAPP_NUMBER = "2348062442682";
const PHONE_NUMBER = "+2348062442682";

const easing = [0.22, 1, 0.36, 1] as const;

const ACTIONS = [
  {
    label: "WhatsApp us",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    external: true,
    Icon: FaWhatsapp,
    className: "bg-[#25D366] text-white",
  },
  {
    label: "Call us",
    href: `tel:${PHONE_NUMBER}`,
    external: false,
    Icon: FaPhoneAlt,
    className: "bg-[#11142B] text-[#F3F1EA]",
  },
];

const FloatingContact = () => {
  return (
    <div className="fixed bottom-6 right-5 z-[60] flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      {ACTIONS.map(({ label, href, external, Icon, className }, i) => (
        <motion.a
          key={label}
          href={href}
          {...(external
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
          aria-label={label}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: easing }}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          className={`group flex h-14 items-center overflow-hidden rounded-full shadow-lg shadow-black/20 ${className}`}
        >
          {/* label reveals on hover */}
          <motion.span
            variants={{
              hover: { width: "auto", opacity: 1, paddingLeft: 20 },
            }}
            initial={{ width: 0, opacity: 0, paddingLeft: 0 }}
            transition={{ duration: 0.35, ease: easing }}
            className="whitespace-nowrap text-sm font-semibold"
          >
            {label}
          </motion.span>

          <span className="flex h-14 w-14 shrink-0 items-center justify-center text-xl">
            <Icon />
          </span>
        </motion.a>
      ))}
    </div>
  );
};

export default FloatingContact;
