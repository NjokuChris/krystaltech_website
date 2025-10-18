"use client";
import { useState, useEffect } from "react";
import Nav from "@/_components/Nav";

import Image from "next/image";
const MainNav = () => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Adjust 100 to the scroll distance you want (in pixels)
      if (window.scrollY > 200) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-all duration-500 z-50 ${
        showNav
          ? "opacity-100 translate-y-0 backdrop-blur-md bg-black/60"
          : "opacity-0 -translate-y-10 pointer-events-none"
      }`}
    >
      <div className="h-25 w-full md:w-full  bg-white p-8 flex justify-between items-center">
        <div>
          <Image
            src="/krystal4.png"
            alt="krystal tech hub logo"
            width={185}
            height={85}
          />
        </div>
        <Nav />
        <button className="hidden md:flex bg-orange-500 text-white px-7 py-3 text-xl rounded-lg hover:from-orange-500 hover:to-orange-400 shadow-md hover:shadow-orange-400/40 transition-all">
          Get started
        </button>
      </div>
    </nav>
  );
};

export default MainNav;
