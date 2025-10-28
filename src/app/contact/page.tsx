import React from "react";

//coms
import NavBar from "@/_components/NavBar";
import MainNav from "@/_components/MainNav";
import Footer from "@/_components/Footer";
import { BiMailSend, BiSolidPhone } from "react-icons/bi";
import { PiMapPinFill } from "react-icons/pi";
import FormComp from "@/_components/FormComp";

const Page = () => {
  return (
    <main className="bg-orange-50 text-center font-sans">
      <NavBar />
      <div className="relative flex items-center justify-center h-full">
        <MainNav />
      </div>
      <div className="p-4">
        <h1 className="text-6xl md:text-7xl font-bold text-black mb-5 mt-50 md:mt-30">
          Contact Us
        </h1>
        <p className="text-black/70 text-lg mb-10 md:w-[40%] mx-auto">
          If you have any questions or would like to learn more about our
          services, please don&apos;t hesitate to contact us. We would love to
          hear from you!
        </p>{" "}
      </div>

      <section
        style={{ backgroundImage: `url("/contact-bg.jpg")` }}
        className="relative bg-cover bg-center h-fit shadow-2xl mb-30 p-10 md:p-20 font-sans
        flex flex-col justify-center items-center gap-20"
      >
        <div className="absolute inset-0 bg-blue-900/40 z-0"></div>
        <div className="relative z-10">
          <ul className="flex gap-20 justify-center items-center flex-wrap">
            <li className="flex flex-col justify-center items-center gap-2">
              {" "}
              <div className="bg-white p-6 rounded-full hover:animate-bounce">
                <BiSolidPhone className="text-orange-600 text-4xl" />{" "}
              </div>
              <p className="text-white">+234 806 244 2682</p>
              <p className="text-white font-bold">Call Us</p>
            </li>
            <li className="flex flex-col justify-center items-center gap-2">
              <div className="bg-white p-6 rounded-full hover:animate-bounce">
                <PiMapPinFill className="text-orange-600 text-4xl" />{" "}
              </div>{" "}
              <p>54 Old refinary Road, portharcourt, rivers state ,Nigeria</p>
              <p className="text-sm font-bold">Our Office</p>
            </li>

            <li className="flex flex-col justify-center items-center gap-2">
              <div className="bg-white p-6 rounded-full hover:animate-bounce">
                <BiMailSend className="text-orange-600 text-4xl" />{" "}
              </div>
              <p className="text-white">support@krystaltechhub.com</p>
              <p className="text-sm font-bold">Our Mailbox</p>{" "}
            </li>
          </ul>
        </div>

        <FormComp />
      </section>
      <Footer />
    </main>
  );
};

export default Page;
