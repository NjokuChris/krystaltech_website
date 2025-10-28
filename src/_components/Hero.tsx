"use client";
import React from "react";
import Link from "next/link";
import NavBar from "@/_components/NavBar";

const Hero = () => {
  return (
    <>
      <section
        className="relative pb-20 h-fit w-full flex flex-col justify-start items-center overflow-x-hidden bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-image.jpg')",
        }}
      >
        <NavBar />

        {/* Hero Content */}
        <div className="flex justify-center w-full h-[80vh] px-10 mt-35 md:mt-0">
          <div className="w-full md:w-[50%] flex flex-col justify-center items-start text-left text-white space-y-4">
            <h1 className="text-7xl md:text-7xl font-bold font-sans w-[40vw] mt-40">
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
          <div className="w-[27vw] h-full"></div>
        </div>

        {/* Overlay with social links and email */}
        <div className="absolute top-0 left-0 h-fit w-full mt-[50vh] -px-4 flex justify-between items-center pointer-events-none">
          {/* Left Social Links */}
          <div className="hidden md:flex flex-col gap-6 text-white mt-40 font-semibold pointer-events-auto">
            <div className="px-5 py-10 mx-10 rounded-t-full transform -rotate-90 origin-left">
              <div className="flex gap-12 text-md">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition"
                >
                  Facebook
                </Link>
                <Link
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition"
                >
                  X (Twitter)
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition"
                >
                  Instagram
                </Link>
              </div>
            </div>
          </div>

          {/* Right Support Mail */}
          <div className="hidden md:flex mx-5 justify-end pointer-events-auto">
            <Link
              href="mailto:support@krystaltechhub.com"
              className="bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold px-7 py-4 rounded-b-full transform rotate-90 origin-right  hover:shadow-orange-200/50 transition-all"
            >
              Support@krystaltechhub.com
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
