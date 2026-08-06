import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, mobile apps, graphic design, online marketing and cyber security — built and shipped for businesses in Port Harcourt and across Nigeria.",
  openGraph: {
    title: "Services — Krystal Tech Hub",
    description:
      "Websites, apps, brands and security work for real businesses. Krystal Tech Hub's development studio, Port Harcourt.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
