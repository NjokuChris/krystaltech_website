import React from "react";
//comp
import Cta from "@/_components/Cta";
import BlogSection from "./BlogSection";

const Extra = () => {
  return (
    <section
      className="w-full h-[90vh] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center gap-25 "
      style={{
        backgroundImage: `url('/testimonial-bg.jpg')`,
      }}
    >
      <Cta />
      <BlogSection />
    </section>
  );
};

export default Extra;
