import React from "react";

//components
import Hero from "@/_components/Hero";
import Stats from "@/_components/Stats";
import AboutSection from "@/_components/AboutSection";

const LandingPage = () => {
  return (
    <main className="font-sans">
      <Hero />
      <Stats />
      <AboutSection />
    </main>
  );
};

export default LandingPage;
