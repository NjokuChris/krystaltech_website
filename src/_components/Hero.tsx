"use client";
import React from "react";
import Link from "next/link";
import NavBar from "@/_components/NavBar";

const Hero = () => {
  return (
    <>
      {" "}
      <section
        className="relative h-screen w-full flex flex-col justify-start items-center overflow-hidden  bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-image.jpg')",
        }}
      >
        <NavBar />

        {/* 📩 Fixed Vertical Email Button */}

        {/* 🌟 Hero Content */}
        <div className="flex justify-center w-full h-full px-10">
          {" "}
          <div className=" w-full md:w-[50%] flex flex-col justify-center items-start text-left text-white space-y-4">
            <h1 className="text-8xl font-bold font-sans w-[40vw]">
              Innovative Tech Solutions
            </h1>
            <p className="text-xl font-sans max-w-md">
              We help businesses and individuals to innovate and grow their
              business through cutting-edge technology solutions.
            </p>
            <button className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:from-orange-500 hover:to-orange-400 shadow-md hover:shadow-orange-400/40 transition-all">
              Get started
            </button>
          </div>
          <div className="w-[27vw] h-full "></div>
        </div>
      </section>{" "}
      <div className="absolute top-0 h-screen w-[98vw] flex justify-between items-center px-[1vw]">
        {" "}
        <div className="hidden md:block w-fit h-fit text-white px-7 py-4 text-md font-bold rounded-t-full transform rotate-90  translate-y-1/2 origin-left transition-all">
          {" "}
          <Link href="face ">Facebook</Link>
          <Link href="face">X (twitter)</Link>
          <Link href="face">Instagram</Link>
        </div>{" "}
        <Link
          href="mailto:support@krystaltechhub.com"
          className="hidden md:block w-fit h-fit bg-orange-500 text-white px-7 py-4 text-md font-bold rounded-b-full transform rotate-90  translate-y-1/2 origin-right hover:from-orange-500 hover:to-orange-400 shadow-md hover:shadow-orange-400/40 transition-all"
        >
          Support@krystaltechhub.com
        </Link>{" "}
      </div>
    </>
  );
};

export default Hero;
