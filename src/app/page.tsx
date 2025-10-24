import React from "react";

//components
import Hero from "@/_components/Hero";
import Stats from "@/_components/Stats";
import AboutSection from "@/_components/AboutSection";
import ServicesSection from "@/_components/ServicesSection";
import NextServices from "@/_components/NextServices";
import HowItWorks from "@/_components/HowItWorks";
import Testimonial from "@/_components/Testimonial";
import WhyChooseUs from "@/_components/WhyChooseUs";
import OurWork from "@/_components/OurWorks";
import Extra from "@/_components/Extra";
import PreFooter from "@/_components/PreFooter";
import Footer from "@/_components/Footer";

const LandingPage = () => {
  return (
    <main className="font-sans  ">
      <Hero />
      <Stats />
      <AboutSection />
      <ServicesSection />
      <NextServices />
      <HowItWorks />
      <Testimonial />
      <WhyChooseUs />
      <OurWork />
      <Extra />
      <PreFooter />
      <Footer />
    </main>
  );
};

export default LandingPage;
