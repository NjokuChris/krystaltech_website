import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Eight hands-on learning tracks for young people — from ICT fundamentals and web development to robotics, UI/UX and AI. Small cohorts, real projects.",
  keywords: [
    "coding programs Port Harcourt",
    "kids tech training Nigeria",
    "robotics class Port Harcourt",
    "web development course for kids",
    "graphic design training Nigeria",
    "ICT fundamentals Port Harcourt",
  ],
  openGraph: {
    title: "Programs — Krystal Tech Hub",
    description:
      "Eight learning tracks taught by working professionals. ICT, Scratch, web dev, design, video editing, UI/UX, robotics and AI.",
    images: [{ url: "/krystal-class-6.png", alt: "Students in class at Krystal Tech Hub" }],
  },
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
