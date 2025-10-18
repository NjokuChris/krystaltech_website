import React from "react";

//from next
import Image from "next/image";
//components
import Nav from "@/_components/Nav";

//icons
import { FaFire } from "react-icons/fa6";
import MainNav from "./MainNav";

const NavBar = () => {
  return (
    <header className="w-full flex flex-col justify-center items-center ">
      <div className="w-full lg:w-[90%] 2xl:w-[90%] flex flex-col justify-center items-center">
        <div className="w-full py-2 px-[5%] md:border-x-6 md:border-orange-600 md:rounded-t-full bg-gray-900 ">
          <p className="flex gap-2 w-fit justify-center items-center">
            {" "}
            <FaFire className="text-orange-600" />{" "}
            <span>
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
          <Nav />
          <button className="hidden md:flex bg-orange-500 text-white px-7 py-3 text-xl rounded-3xl rounded-br-full hover:from-orange-500 hover:to-orange-400 shadow-md hover:shadow-orange-400/40 transition-all">
            Get started
          </button>
        </div>
      </div>
      <MainNav />
    </header>
  );
};

export default NavBar;
