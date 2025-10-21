import React from "react";

//next
import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

import MainNav from "./MainNav";

const AboutSection = () => {
  return (
    <section className="bg-orange-50 flex flex-col-reverse md:flex-row md:flex-nowrap w-full h-fit py-20 px-2 overflow-hidden">
      <MainNav />
      <div className="flex justify-end items-start w-full md:w-[50%] pr-40">
        <div className="w-fit ml-auto mt-5 md:mt-0">
          <Image
            src="/the-dev.jpg"
            alt="man from krystal tech"
            width={500}
            height={500}
            className="rounded"
          />{" "}
          <Image
            src="/our-man.jpg"
            alt="man from krystal tech"
            width={300}
            height={300}
            className="rounded ml-40 md:ml-60 -mt-30 md:-mt-50"
          />
        </div>
      </div>

      <div className="w-full md:w-[50%] flex flex-col gap-6 md:gap-4 p-2">
        <h2 className="bg-gray-500/20 text-xs capitalize text-orange-600 rounded-full py-2 px-3 w-fit">
          About our Company
        </h2>
        <p className="font-bold text-6xl text-gray-800 w-[80vw] md:w-[40vw] ">
          Work together for your business
        </p>
        <p className="w-[80vw] md:w-[40vw] text-lg text-gray-500">
          IT consulting and software development services. We have helped non-IT
          organizations and companies improve business and companies improve
        </p>
        <div className="bg-gray-300 h-[0.5px] w-[60%]"></div>
        <div className="flex gap-5 justify-start items-center">
          <Image
            src="/certified.png"
            alt="man from krystal tech"
            width={140}
            height={140}
            className="rounded"
          />{" "}
          <ul className="text-gray-500">
            <li className="flex gap-2 text-xl items-center">
              <FaArrowCircleRight className="text-orange-600" />
              <span className="hover:underline">
                Solution We Provide For You
              </span>
            </li>
            <li className="flex gap-2 text-xl items-center">
              <FaArrowCircleRight className="text-orange-600" />
              <span className="hover:underline">Provide Finest Services</span>
            </li>
            <li className="flex gap-2 text-xl items-center">
              <FaArrowCircleRight className="text-orange-600" />
              <span className="hover:underline">
                Providing Information To A Client.
              </span>
            </li>
            <li className="flex gap-2 text-xl items-center">
              <FaArrowCircleRight className="text-orange-600" />
              <span className="hover:underline">Strategic Planning.</span>
            </li>
          </ul>
        </div>
        <button className="flex justify-center items-center gap-2 w-fit bg-orange-600 text-white px-7 py-3 text-xl rounded-lg hover:from-orange-500 hover:to-orange-400 shadow-md hover:shadow-orange-400/40 transition-all">
          Reach Out <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
