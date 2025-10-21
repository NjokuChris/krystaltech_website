"use client";
import { useState } from "react";

//from next
import Image from "next/image";
//components
//import Nav from "@/_components/Nav";

//icons
import { FaFire } from "react-icons/fa6";

import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";

const NavBar = () => {
  const [openDropdown, setOpenDropdownn] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleDropdownn = (name: string) => {
    setOpenDropdownn(openDropdown === name ? null : name);
  };

  const navItems = [
    { name: "Home", links: ["Overview", "Updates", "Get Started"] },
    { name: "Services", links: ["Web Design", "Mobile Apps", "SEO"] },
    { name: "Page", links: ["About", "Contact", "FAQ"] },
    { name: "Shop", links: ["Products", "Cart", "Checkout"] },
    { name: "Blog", links: ["Latest Posts", "Tutorials", "News"] },
  ];
  return (
    <header className="w-full flex flex-col justify-center items-center fixed -top-0 md:relative ">
      <div className="w-full lg:w-[90%] 2xl:w-[90%] flex flex-col justify-center items-center">
        <div className="w-full py-2 px-[5%] md:border-x-6 md:border-orange-600 md:rounded-t-full bg-gray-900 ">
          <p className="flex gap-2 w-fit justify-center items-center">
            {" "}
            <FaFire className="text-orange-600" />{" "}
            <span className="text-white dark:text-white">
              <span className="font-bold">Hot Line:</span> + 123 12 0033 39
            </span>
          </p>
        </div>
        <div className="h-25 w-full md:w-[90%] md:rounded-b-[80px] bg-white p-8 flex justify-between items-center">
          <div>
            <Image
              src="/krystal4.png"
              alt="krystal tech hub logo"
              width={185}
              height={85}
            />
          </div>
          <nav className="md:w-[40%] text-white text-xl font-bold">
            {/* Desktop Nav */}
            <ul className="hidden md:flex justify-between ">
              {navItems.map((item) => (
                <li key={item.name} className="relative group">
                  <button
                    onClick={() => toggleDropdownn(item.name)}
                    className="flex items-center text-black space-x-1 hover:text-orange-600"
                  >
                    <span className="text-black hover:text-orange-600">
                      {item.name}
                    </span>
                    <FiChevronDown
                      className={`transition-transform duration-200 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  {openDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-black/70 backdrop-blur-md rounded-lg shadow-lg py-2">
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

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="text-orange-600 font-bold text-4xl md:hidden"
            >
              {mobileMenu ? <FiX /> : <FiMenu />}
            </button>

            {/* Mobile Menu */}
            {mobileMenu && (
              <div className="md:hidden h-screen w-[100vw] mt-20 bg-black/20 backdrop-blur-md border-t border-white/10 absolute top-10 left-0">
                {navItems.map((item) => (
                  <div key={item.name} className="border-b border-white/10">
                    <button
                      onClick={() => toggleDropdownn(item.name)}
                      className="w-full flex items-center justify-between px-6 py-3 text-white"
                    >
                      <span>{item.name}</span>
                      <FiChevronDown
                        className={`transition-transform duration-200 ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openDropdown === item.name && (
                      <div className="bg-black/60">
                        {item.links.map((link) => (
                          <a
                            key={link}
                            href="#"
                            className="block px-10 py-2 text-sm text-gray-200 hover:bg-white/10"
                          >
                            {link}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </nav>
          <button className="hidden md:flex bg-orange-500 text-white px-7 py-3 text-xl rounded-3xl rounded-br-full hover:from-orange-500 hover:to-orange-400 shadow-md hover:shadow-orange-400/40 transition-all">
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
