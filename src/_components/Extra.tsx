import React from "react";
//comp
import DeviceCTABanner from "@/_components/DeviceCTABanner";
import { ctaConfigs } from "@/_components/ctaConfigs";
import BlogSection from "./BlogSection";

const Extra = () => {
  return (
    <>
      <DeviceCTABanner {...ctaConfigs.home} />
      <BlogSection />
    </>
  );
};

export default Extra;
