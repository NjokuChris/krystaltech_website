import React from "react";

//next
import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";
const AboutSection = () => {
  return (
    <section className="flex flex-nowrap h-screen py-20">
      <div className="flex justify-end items-start w-[50%] pr-40">
        <div className="w-fit ml-auto">
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
            className="rounded ml-60 -mt-50"
          />
        </div>
      </div>

      <div className="w-[50%] flex flex-col gap-4">
        <h2 className="bg-gray-500/20 text-orange-600 rounded-full py-2 px-3 w-fit">
          About our Company
        </h2>
        <p className="font-bold text-6xl w-[40vw] ">
          Work together for your business
        </p>
        <p className="w-[30vw] text-lg">
          IT consulting and software development services. We havace helped
          non-IT organizations and companies improve business and companies
          improve
        </p>
        <div></div>
        <div className="flex gap-5 justify-start items-center">
          <Image
            src="/certified.png"
            alt="man from krystal tech"
            width={140}
            height={140}
            className="rounded"
          />{" "}
          <ul>
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
          <button>Reach Out</button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
