import React from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import Partners from "./Partners";

const Stats = () => {
  return (
    <section className="w-full flex flex-col">
      <div className="w-full h-fit md:h-25 flex flex-col md:flex-row flex-nowrap ">
        <div className="w-full md:w-[45%]  bg-white py-auto">
          <div className=" ml-auto  w-full md:w-fit h-full flex justify-between gap-4 items-center font-bold text-black px-5 py-2">
            <div className="gap-2 flex  justify-center items-center">
              {" "}
              <p className="text-4xl  font-sans">+60</p>
              <p className="text-md">Daily Customer</p>{" "}
            </div>
            <div className="h-[70%] w-[0.5px] hidden md:block bg-orange-200 "></div>
            <div className="gap-2 flex justify-center items-center">
              {" "}
              <p className="text-4xl  font-sans">50</p>
              <p className="text-md">Team Member</p>{" "}
            </div>
          </div>
        </div>
        <div className="w-full md:w-[55%] h-fit md:h-full bg-blue-950 md:mr-auto flex items-center gap-5 px-5 py-2 ">
          <Image
            src="/man.png"
            alt="man from krystal tech"
            width={40}
            height={40}
            className="rounded"
          />
          <p className="w-[40%] text-white dark:text-white">
            Consulting for your software development, web, mobile, desktop
            applications for your businesses
          </p>

          <div className="flex text-black gap-3">
            <button className="bg-white p-4 h-fit rounded-full text-black ">
              <FaArrowLeft />
            </button>
            <button className="bg-white p-4 h-fit rounded-full text-black ">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
      <Partners />
    </section>
  );
};

export default Stats;
