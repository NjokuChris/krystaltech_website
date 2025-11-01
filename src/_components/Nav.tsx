"use client";

import { useState } from "react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";

const Nav = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const navItems = [
    { name: "Home", links: ["Overview", "Updates", "Get in Touch"] },
    { name: "Services", links: ["Web Design", "Mobile Apps", "SEO"] },
    { name: "Page", links: ["About", "Contact", "FAQ"] },
    { name: "Shop", links: ["Products", "Cart", "Checkout"] },
    { name: "Blog", links: ["Latest Posts", "Tutorials", "News"] },
  ];

  return (
    <nav className="md:w-[40%] text-white text-xl font-bold">
      {/* Desktop Nav */}
      <ul className="hidden md:flex justify-between ">
        {navItems.map((item) => (
          <li key={item.name} className="relative group">
            <button
              onClick={() => toggleDropdown(item.name)}
              className="flex items-center space-x-1 hover:text-orange-600"
            >
              <span className="text-black">{item.name}</span>
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
        <div className="md:hidden h-screen w-[100vw] mt-20 bg-black/80 backdrop-blur-md border-t border-white/10">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-white/10">
              <button
                onClick={() => toggleDropdown(item.name)}
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
  );
};

export default Nav;
