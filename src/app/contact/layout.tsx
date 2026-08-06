import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to Krystal Tech Hub. Enrol a learner in one of our programs or start a software project. We're at 54 Old Refinery Road, Elelenwo, Port Harcourt.",
  openGraph: {
    title: "Contact Krystal Tech Hub",
    description:
      "Enrolling a young builder or starting a business project? Get in touch — we usually reply within a day.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
