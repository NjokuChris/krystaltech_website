import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the builders behind Krystal Tech Hub — the same team that ships client work is the team in the classroom.",
  openGraph: {
    title: "Our Team — Krystal Tech Hub",
    description:
      "Builders who teach what they ship. Meet the mentors and developers at Krystal Tech Hub in Port Harcourt.",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
