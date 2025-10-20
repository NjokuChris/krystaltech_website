"use client";

import React from "react";
import * as FaIcons from "react-icons/fa";

type Feature = {
  id: string;
  icon: string;
  title: string;
  text: string;
  bg: string;
  highlight?: boolean;
};

const features: Feature[] = [
  {
    id: "secure",
    icon: `FaShieldAlt`,
    title: "Smart & Secure System",
    text: "We prioritize data privacy and system reliability, using advanced encryption and modern infrastructure to keep your operations safe and efficient.",
    bg: "bg-orange-100",
  },
  {
    id: "team",
    icon: `FaUsers`,
    title: "Professional Team",
    text: "Our experienced developers, designers, and project managers collaborate to deliver high-quality digital solutions that make a real impact.",
    bg: "bg-orange-200",
    highlight: true,
  },
  {
    id: "certified",
    icon: `FaMedal`,
    title: "Certified Experts",
    text: "We bring years of hands-on experience and industry-recognized certifications, ensuring our work meets global standards every time.",
    bg: "bg-orange-100",
  },
  {
    id: "support",
    icon: `FaHeadset`,
    title: "24/7 Premium Support",
    text: "Our dedicated support team is available around the clock — ready to help you with any technical needs or business inquiries.",
    bg: "bg-orange-50",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="relative w-full py-20 bg-[#0B0F19] text-center">
      <div className="mx-auto px-6 text-center">
        <h2 className="text-sm uppercase md:text-sm font-bold text-orange-500 mb-5">
          Why Choose Us
        </h2>

        <p className="text-lg max-w-[40vw] mx-auto text-gray-300 mb-14">
          Let us change the way you think about technology — we combine
          creativity, reliability, and innovation to help your business scale
          faster.
        </p>

        <div className="flex flex-wrap justify-center gap-10">
          {features.map((f) => {
            const IconComponent = (
              FaIcons as Record<string, React.ElementType>
            )[f.icon];

            return (
              <article
                key={f.id}
                className={`rounded-2xl shadow-md transition-all p-8 flex flex-col items-center justify-center text-center gap-4 w-[20rem] ${
                  f.bg
                } ${
                  f.highlight
                    ? "scale-105 border-2 border-orange-500 shadow-lg shadow-orange-300 hover:scale-110"
                    : "hover:scale-105 hover:shadow-lg"
                }`}
              >
                <div className="p-4 bg-white rounded-full shadow">
                  {IconComponent && (
                    <IconComponent
                      size={36}
                      className={`${
                        f.highlight ? "text-orange-600" : "text-orange-500"
                      }`}
                    />
                  )}
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {f.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-700">
                  {f.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
