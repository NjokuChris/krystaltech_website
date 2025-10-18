import React from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Stats = () => {
  return (
    <section className="w-full flex flex-col">
      <div className="w-full h-25 flex flex-nowrap ">
        <div className="w-[45%]  bg-white py-auto">
          <div className=" ml-auto  w-fit h-full flex justify-between gap-4 items-center font-bold text-black px-5">
            <div className="gap-2 flex justify-center items-center">
              {" "}
              <p className="text-4xl  font-sans">+60</p>
              <p className="text-md">Daily Customer</p>{" "}
            </div>
            <div className="h-[70%] w-[0.5px] bg-orange-200 "></div>
            <div className="gap-2 flex justify-center items-center">
              {" "}
              <p className="text-4xl  font-sans">50</p>
              <p className="text-md">Team Member</p>{" "}
            </div>
          </div>
        </div>
        <div className="w-[55%] h-full bg-blue-950 mr-auto flex items-center gap-5 px-5 ">
          <Image
            src="/man.png"
            alt="man from krystal tech"
            width={40}
            height={40}
            className="rounded"
          />
          <p className="w-[40%]">
            Consulting for you software development ,web ,mobile ,destop
            applictions for your businesses
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
      <div className="h-50 w-full bg-black"></div>
    </section>
  );
};

export default Stats;
