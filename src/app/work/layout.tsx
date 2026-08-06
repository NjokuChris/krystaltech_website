import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Real websites, apps, brands and security work shipped for Port Harcourt businesses. Browse Krystal Tech Hub's project portfolio.",
  openGraph: {
    title: "Our Work — Krystal Tech Hub",
    description:
      "40+ projects shipped for real businesses — websites, mobile apps, branding and cyber security.",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
