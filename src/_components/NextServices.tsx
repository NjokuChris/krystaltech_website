import React from "react";
import Image from "next/image";
import {
  FaBullhorn,
  FaGlobe,
  FaMobileAlt,
  FaPalette,
  FaShieldAlt,
} from "react-icons/fa";

const NextServices = () => {
  return (
    <section className=" bg-orange-50 w-full min-h-screen flex flex-col justify-center items-center overflow-hidden py-20">
      <div className="w-[90vw] md:w-[80vw]">
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-8">
          {/* Graphic Design */}
          <div className="card bg-gradient-to-br from-[#1E293B] to-[#334155] p-8 rounded-2xl shadow-lg hover:scale-105 hover:shadow-orange-500/20 transition-all duration-300 flex flex-col gap-4">
            <FaPalette size={30} className="text-orange-400" />
            <h2 className="text-xl font-semibold text-white">Graphic Design</h2>
            <p className="text-gray-300">
              We design visuals that speak clearly, build recognition, and keep
              your brand unforgettable.
            </p>
          </div>

          {/* Mobile App Development */}
          <div className="card row-span-2 bg-gradient-to-br from-orange-600 to-orange-400  rounded-2xl shadow-lg hover:scale-105 hover:shadow-orange-500/30 transition-all duration-300 flex flex-col gap-4 justify-between">
            <div className="p-8">
              <FaMobileAlt size={30} className="text-white" />
              <h2 className="text-xl font-semibold text-white">
                Mobile App Development
              </h2>
              <p className="text-gray-100">
                Build sleek, fast apps that engage users and bring your ideas to
                life across all devices.
              </p>
            </div>
            <Image
              src="/ph-mockup.png"
              alt="mobile app"
              width={200}
              height={200}
              className="w-[400px] h-[400px] rounded-2xl"
            />
          </div>

          {/* Online Marketing */}
          <div className="card bg-gradient-to-br from-[#F97316] to-[#EA580C] p-8 rounded-2xl shadow-lg hover:scale-105 hover:shadow-orange-400/30 transition-all duration-300 flex flex-col gap-4">
            <FaBullhorn size={30} className="text-white" />
            <h2 className="text-xl font-semibold text-white">
              Online Marketing
            </h2>
            <p className="text-gray-100">
              Reach the right audience with data-driven campaigns that grow
              traffic and drive real results.
            </p>
          </div>

          {/* Cyber Security */}
          <div className="card bg-gradient-to-br from-[#1E40AF] to-[#2563EB] p-8 rounded-2xl shadow-lg hover:scale-105 hover:shadow-orange-400/20 transition-all duration-300 flex flex-col gap-4">
            <FaShieldAlt size={30} className="text-white" />
            <h2 className="text-xl font-semibold text-white">Cyber Security</h2>
            <p className="text-gray-100">
              Protect your data and users with proactive security strategies
              that keep threats away for good.
            </p>
          </div>

          {/* Website Development */}
          <div className="card bg-gradient-to-br from-[#111827] to-[#1F2937] p-8 rounded-2xl shadow-lg hover:scale-105 hover:shadow-orange-400/20 transition-all duration-300 flex flex-col gap-4">
            <FaGlobe size={30} className="text-orange-400" />
            <h2 className="text-xl font-semibold text-white">
              Website Development
            </h2>
            <p className="text-gray-300">
              We create powerful, fast-loading websites that convert visitors
              into loyal customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextServices;
