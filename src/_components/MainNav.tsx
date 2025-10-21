"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
const MainNav = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Adjust 100 to the scroll distance you want (in pixels)
      if (window.scrollY > 300) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", links: ["Overview", "Updates", "Get Started"] },
    { name: "Services", links: ["Web Design", "Mobile Apps", "SEO"] },
    { name: "Page", links: ["About", "Contact", "FAQ"] },
    { name: "Shop", links: ["Products", "Cart", "Checkout"] },
    { name: "Blog", links: ["Latest Posts", "Tutorials", "News"] },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 hidden md:flex w-full transition-all duration-500 z-500 shadow-lg shadow-b ${
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

        <ul className="hidden md:flex justify-between md:w-[40%] text-black text-md font-bold ">
          {navItems.map((item) => (
            <li key={item.name} className="relative group">
              <button
                onClick={() => toggleDropdown(item.name)}
                className="flex items-center text-gray-700 space-x-1 hover:text-orange-600  "
              >
                <span className="text-black hover:text-orange-600">
                  {item.name}
                </span>
                <FiChevronDown
                  className={`transition-transform  duration-200 ${
                    openDropdown === item.name ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {openDropdown === item.name && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-black/70 text-white backdrop-blur-md rounded-lg shadow-lg py-2">
                  {item.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-white/10"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <button className="hidden md:flex bg-orange-500 text-white px-7 py-3 text-xl rounded-lg hover:from-orange-500 hover:to-orange-400 shadow-md hover:shadow-orange-400/40 transition-all">
          Get started
        </button>
      </div>
    </nav>
  );
};

export default MainNav;
