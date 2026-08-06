import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for Krystal Tech Hub's software services — websites, mobile apps, graphic design, online marketing and cyber security.",
  openGraph: {
    title: "Pricing — Krystal Tech Hub",
    description:
      "Clear, honest pricing for web development, mobile apps, branding, marketing and security services in Port Harcourt.",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
