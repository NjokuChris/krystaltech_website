import React from "react";
//comp
import CtaBanner from "@/_components/CtaBanner";
import BlogSection from "./BlogSection";

const Extra = () => {
  return (
    <>
      <CtaBanner
        title="Ready to learn, or ready to build?"
        body="Enrol a young builder in a program, or bring us a project for your business. Either way, it starts with a quick conversation."
        primary={{ label: "Explore programs", href: "/programs" }}
        secondary={{ label: "See our services", href: "/services" }}
        image="/pc-setup.png"
        imageAlt="A workstation at Krystal Tech Hub"
      />
      <BlogSection />
    </>
  );
};

export default Extra;
