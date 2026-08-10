import type { Metadata } from "next";
import React from "react";
import JsonLd, { localBusinessSchema } from "@/_components/JsonLd";

export const metadata: Metadata = {
  title: "Krystal Tech Hub — Tech Training & Software Development in Port Harcourt",
  description:
    "We train young people in coding, design, robotics and more — and build websites, apps and brands for businesses. Based in Port Harcourt, Nigeria.",
  openGraph: {
    title: "Krystal Tech Hub — Tech Training & Software Development in Port Harcourt",
    description:
      "We train the future and build for the present. Coding programs for kids + software development studio in Port Harcourt.",
    url: "https://www.krystaltechhub.com",
    images: [{ url: "/krystal4.png", alt: "Krystal Tech Hub" }],
  },
};

//components
import NavBar from "@/_components/NavBar";
import Hero from "@/_components/Hero";
import StatsPartners from "@/_components/StatsPartners";
import Stats from "@/_components/programs";
import AboutSection from "@/_components/AboutSection";
import ServicesSection from "@/_components/ServicesSection";
import NextServices from "@/_components/NextServices";
import HowItWorks from "@/_components/HowItWorks";
import Testimonial from "@/_components/Testimonial";
import WhyChooseUs from "@/_components/WhyChooseUs";
import OurWork from "@/_components/OurWorks";
import Extra from "@/_components/Extra";
import Footer from "@/_components/Footer";
import Happeningnow from "@/_components/Happeningnow";

const LandingPage = () => {
  return (
    <main className="font-sans bg-[#F3F1EA]">
      <JsonLd data={localBusinessSchema} />
      <NavBar />
      <Hero />
      <StatsPartners />
      <Happeningnow />
      <Stats />
      <ServicesSection />
      <AboutSection />
      <HowItWorks />
      <Testimonial />
      <WhyChooseUs />
      <OurWork />
      <Extra />
      <Footer />
    </main>
  );
};

export default LandingPage;
