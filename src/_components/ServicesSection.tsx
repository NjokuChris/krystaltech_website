import React from "react";
import Image from "next/image";
import { FaLightbulb, FaCode, FaMicrochip } from "react-icons/fa6";

const ServicesSection = () => {
  return (
    <section
      className="relative h-fit w-full flex flex-col justify-start items-center overflow-hidden py-20 bg-fixed bg-top bg-no-repeat"
      style={{
        backgroundImage: "url('/bg-1.jpg')",
      }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto px-6">
        {/* Left content */}
        <div className="lg:w-1/2 text-left mb-10 lg:mb-0">
          <h2 className="text-orange-500 uppercase text-md rounded-full mb-4">
            Our Services
          </h2>
          <h3 className="text-4xl font-medium mb-4 text-white">
            Let us do the work, <br />
            so you can focus on what matters.
          </h3>
          <p className="text-sm text-gray-400 mb-8 max-w-md">
            We handle the strategy, design, and tech — so your ideas move
            faster, your workload gets lighter, and your goals turn into real
            results.
          </p>

          <ul className="flex flex-col gap-5">
            {/* Creative Solutions */}
            <li>
              <article className="flex gap-4 items-start">
                <div className="bg-orange-500 p-3 text-2xl rounded-full w-fit h-fit text-white">
                  <FaLightbulb />
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-white">
                    Creative Solutions
                  </h4>
                  <p className="text-sm text-gray-400">
                    We turn ideas into experiences that stand out. From branding
                    and design to motion and storytelling, we help your business
                    look sharp and stay memorable.
                  </p>
                </div>
              </article>
            </li>

            {/* Software Development */}
            <li>
              <article className="flex gap-4 items-start">
                <div className="bg-orange-500 p-3 text-2xl rounded-full w-fit h-fit text-white">
                  <FaCode />
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-white">
                    Software Development
                  </h4>
                  <p className="text-sm text-gray-400">
                    We build fast, scalable apps tailored to your goals. Clean
                    code, smooth interfaces, and reliable performance — every
                    time.
                  </p>
                </div>
              </article>
            </li>

            {/* IoT */}
            <li>
              <article className="flex gap-4 items-start">
                <div className="bg-orange-500 p-3 text-2xl rounded-full w-fit h-fit text-white">
                  <FaMicrochip />
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-white">
                    IoT &amp; Programming
                  </h4>
                  <p className="text-sm text-gray-400">
                    We create smart, connected systems that work seamlessly —
                    from embedded devices to secure APIs and modern apps.
                  </p>
                </div>
              </article>
            </li>
          </ul>
        </div>

        {/* Right image */}
        <div className="lg:w-1/2 flex justify-center">
          <Image
            src="/pc-setup.png"
            alt="a pc setup"
            width={500}
            height={500}
            className="w-full max-w-[450px] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
