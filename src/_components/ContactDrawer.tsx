"use client";

/**
 * ContactDrawer
 * ------------------------------------------------------------
 * A reusable slide-in panel that renders the ContactForm.
 * Use it from any CTA across the site:
 *
 *   const [open, setOpen] = useState(false);
 *   <button onClick={() => setOpen(true)}>Get in touch</button>
 *   <ContactDrawer open={open} onClose={() => setOpen(false)} />
 *
 * Slides in from the right on desktop, covers full screen on mobile.
 * Locks body scroll while open.
 */

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ContactForm from "@/_components/FormComp";

interface ContactDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ open, onClose }: ContactDrawerProps) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-[#11142B]/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Contact us"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 right-0 top-0 z-[70] flex w-full flex-col bg-[#F3F1EA] shadow-2xl shadow-[#11142B]/20 sm:w-[520px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#11142B]/10 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#11142B]/45">
                  Quick contact
                </p>
                <h2 className="mt-0.5 text-lg font-semibold text-[#11142B]">
                  Get in touch
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close contact panel"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#11142B]/50 transition-colors hover:bg-[#11142B]/8 hover:text-[#11142B]"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable form */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ContactForm />
            </div>

            {/* Footer */}
            <div className="border-t border-[#11142B]/8 px-6 py-4 text-center">
              <p className="text-xs text-[#11142B]/40">
                Need more info?{" "}
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="font-medium text-[#11142B]/60 underline underline-offset-2 hover:text-[#11142B]"
                >
                  Visit the full contact page
                </Link>
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
