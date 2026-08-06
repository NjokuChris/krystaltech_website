import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingContact from "@/_components/FloatingContact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://www.krystaltechhub.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Krystal Tech Hub — Tech Training & Software Development in Port Harcourt",
    template: "%s | Krystal Tech Hub",
  },
  description:
    "Krystal Tech Hub trains young people in coding, design, robotics and more — and builds websites, apps and brands for businesses in Port Harcourt and beyond.",
  keywords: [
    "tech training Port Harcourt",
    "coding school Nigeria",
    "software development Port Harcourt",
    "web development Nigeria",
    "kids coding class Port Harcourt",
    "Krystal Tech Hub",
    "robotics for kids Nigeria",
    "mobile app development Port Harcourt",
  ],
  authors: [{ name: "Krystal Tech Hub", url: BASE_URL }],
  creator: "Krystal Tech Hub",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: BASE_URL,
    siteName: "Krystal Tech Hub",
    title: "Krystal Tech Hub — Tech Training & Software Development in Port Harcourt",
    description:
      "We train young builders and ship real software for businesses. Based in Port Harcourt, Nigeria.",
    images: [{ url: "/krystal4.png", width: 1200, height: 630, alt: "Krystal Tech Hub" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@krystal_teck",
    creator: "@krystal_teck",
    title: "Krystal Tech Hub — Tech Training & Software Development",
    description:
      "We train young builders and ship real software for businesses. Based in Port Harcourt, Nigeria.",
    images: ["/krystal4.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-[#F3F1EA] text-black`}
      >
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
