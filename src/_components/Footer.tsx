import React from "react";

//from next
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import MapPreview from "./MapPreview";

const Footer = () => {
  return (
    <footer
      className="text-white dark:text-white relative h-fit w-full flex flex-col justify-between items-between overflow-hidden bg-fixed bg-top bg-no-repeat shadow-2xl "
      style={{
        backgroundImage: "url('/bg-1.jpg')",
      }}
    >
      <div className="bg-orange-100 w-100 h-120 rounded-4xl absolute z-0 transform rotate-45 -top-30 md:-top-20 -left-23 shadow-2xl "></div>
      <div className="px-6 md:px-20 py-10 z-1 flex flex-col md:flex-row md:justify-between justify-center items-center md:items-start flex-wrap gap-10 my-10 text-center md:text-left">
        {/* Logo + Socials */}
        <div className="w-full md:w-auto flex flex-col justify-center md:justify-start items-center md:items-start">
          <div className="h-30 flex flex-col overflow-hidden md:-ml-20 mb-4">
            <Image
              src="/krystal4.png"
              alt="krystal tech hub logo"
              width={250}
              height={90}
            />
          </div>

          <div className="flex gap-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="bg-orange-500 text-white font-semibold p-3 rounded-full shadow-lg hover:shadow-orange-200/50 transition-all"
            >
              <FaFacebook />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="bg-orange-500 text-white font-semibold p-3 rounded-full shadow-lg hover:shadow-orange-200/50 transition-all"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://x.com"
              target="_blank"
              className="bg-orange-500 text-white font-semibold p-3 rounded-full shadow-lg hover:shadow-orange-200/50 transition-all"
            >
              <FaXTwitter />
            </Link>
          </div>
        </div>

        {/* Company */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-orange-500 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-orange-500 transition">
                Careers
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-orange-500 transition">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-orange-500 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Solutions */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className=" font-semibold mb-4">Solutions</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/services/web"
                className="hover:text-orange-500 transition"
              >
                Web Development
              </a>
            </li>
            <li>
              <a
                href="/services/mobile"
                className="hover:text-orange-500 transition"
              >
                Mobile Apps
              </a>
            </li>
            <li>
              <a
                href="/services/ai"
                className="hover:text-orange-500 transition"
              >
                AI Solutions
              </a>
            </li>
            <li>
              <a
                href="/services/cloud"
                className="hover:text-orange-500 transition"
              >
                Cloud & DevOps
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className=" font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="/help" className="hover:text-orange-500 transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="/pricing" className="hover:text-orange-500 transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-orange-500 transition">
                FAQ
              </a>
            </li>
            <li>
              <a href="/status" className="hover:text-orange-500 transition">
                System Status
              </a>
            </li>
          </ul>
        </div>

        {/* Map */}
        <div className="w-full md:w-auto flex justify-center md:justify-end mt-5 md:mt-0">
          <MapPreview />
        </div>
      </div>

      <div className="bg-white/10 w-full h-30 md:h-20 flex flex-col-reverse md:flex-row justify-between items-center text-center p-5 md:pl-100 md:pr-20">
        <p className="font-bold">
          Copyright © {new Date().getFullYear()} krystalTechnologies, All rights
          reserved.
        </p>

        <ul className=" flex gap-3">
          <li>
            <a href="#" className="hover:text-orange-500 transition">
              Term of use
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition">
              Cookie Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
