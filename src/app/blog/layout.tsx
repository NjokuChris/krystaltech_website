import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tech guides, industry insight and updates from the Krystal Tech Hub team in Port Harcourt.",
  openGraph: {
    title: "Blog — Krystal Tech Hub",
    description:
      "Tech guides, industry insight and updates from the Krystal Tech Hub team.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
