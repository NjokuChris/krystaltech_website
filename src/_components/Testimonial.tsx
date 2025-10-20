import React from "react";
import Image from "next/image";
import { BsFillStarFill } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  return (
    <section
      className="relative w-full py-20 px-5 md:px-20 bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: "url('/testimonial-bg.jpg')" }}
    >
      <div className="w-full md:w-[80vw] flex flex-col md:flex-row justify-center items-center gap-5 ">
        {/* Side Images */}
        <div className="flex md:flex-col flex-row md:gap-5 mb-10 gap-3 justify-center items-center">
          <Image
            src="/testimonial-4.png"
            alt="Customer testimonial"
            width={90}
            height={90}
            className="rounded-full border-2  shadow-lg md:ml-10 relative left-18"
          />
          <Image
            src="/testimonial-2.png"
            alt="Customer testimonial"
            width={90}
            height={90}
            className="rounded-full border-2  shadow-lg md:ml-5 relative left-15"
          />
          <Image
            src="/testimonial-3.png"
            alt="Customer testimonial"
            width={90}
            height={90}
            className="rounded-full border-2  shadow-lg md:ml-0 relative left-25"
          />
        </div>

        {/* Main Testimonial Card */}
        <div className="relative p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-8">
          {/* Customer Image + Info */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/testimonial-6.png"
              alt="John Doe - Client"
              width={200}
              height={200}
              className="rounded-full border-4  shadow-lg"
            />
            <h3 className="text-xl font-bold text-orange-200 mt-4">John Doe</h3>
            <p className="text-gray-600 uppercase text-sm">Client</p>
          </div>

          {/* Testimonial Content */}
          <div className="flex flex-col gap-6 max-w-xl">
            <span className="text-5xl text-orange-400">
              <FaQuoteLeft />
            </span>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              This is due to their excellent service, competitive pricing, and
              great customer support. It’s truly refreshing to experience such a
              personal touch and professionalism.
            </p>

            {/* Rating */}
            <div className="flex gap-2 text-amber-500 text-lg">
              {[...Array(5)].map((_, i) => (
                <BsFillStarFill key={i} />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3 mt-4">
              <button className="bg-white hover:bg-orange-100 p-4 rounded-full shadow-md text-black transition">
                <FaArrowLeft />
              </button>
              <button className="bg-white hover:bg-orange-100 p-4 rounded-full shadow-md text-black transition">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
