import React from "react";
import WorkComp from "./WorkComp";

const OurWork = () => {
  return (
    <section className="w-full bg-white p-20 pb-20 md:pb-70">
      <div className=" w-full 2xl:max-w-7xl  ml-auto mb-12 text-left">
        <h2 className="text-sm rounded-full px-4 py-2 w-fit bg-orange-100 text-orange-500 uppercase font-bold mb-2">
          Our Work
        </h2>
        <p className="text-5xl md:text-6xl font-bold text-gray-800 mb-10">
          Exclusive IT Solutions
        </p>
        <div className="flex gap-10 w-full overflow-hidden pb-20 bl-20">
          <WorkComp />
          <WorkComp />
          <WorkComp />
          <WorkComp />
        </div>{" "}
      </div>
    </section>
  );
};

export default OurWork;
