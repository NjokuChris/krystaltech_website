import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Krystal Tech Hub is a technology hub in Port Harcourt with two missions: teaching young people to build with computers, and shipping real software for businesses.",
  openGraph: {
    title: "About Krystal Tech Hub",
    description:
      "We train the future and build for the present. Based at 54 Old Refinery Road, Elelenwo, Port Harcourt.",
    images: [{ url: "/krystal-class-3.png", alt: "Students at Krystal Tech Hub" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
