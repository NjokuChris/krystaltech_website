"use client";

import Footer from "@/_components/Footer";
import MainNav from "@/_components/MainNav";
import NavBar from "@/_components/NavBar";
import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

//data
import { faqData } from "@/data/faqdata";

type data = {
  question: string;
  answer: string;
};

const Faq = () => {
  return (
    <main className="bg-orange-50 text-center text-black font-sans">
      <NavBar />
      <div className="relative flex items-center justify-center h-full">
        <MainNav />
      </div>{" "}
      <div className="p-4">
        <h1 className="text-6xl md:text-7xl font-bold text-black mb-5 mt-50 md:mt-30">
          FAQs
        </h1>
        <p className="text-black/70 text-lg mb-10 md:w-[40%] mx-auto">
          Find answers to common questions about our services, including
          pricing, features, and more.
        </p>{" "}
      </div>
      <section className="flex flex-col items-center justify-center gap-5 py-10 w-[65%] mx-auto">
        {faqData.map((data: data, idx: number) => {
          return (
            <FaqComp key={idx} question={data.question} answer={data.answer} />
          );
        })}
      </section>
      <Footer />
    </main>
  );
};

export default Faq;

const FaqComp = (prop: data) => {
  const [faqs, setFaqs] = useState(false);

  const HandleClick = () => {
    return setFaqs((prev) => !prev);
  };

  return (
    <div className="bg-white p-5 border-[0.5px] border-orange-200/70 rounded-xl  w-full shadow ">
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg py-3">{prop.question}</p>

        <button onClick={HandleClick} className="text-orange-400">
          {faqs ? (
            <FiMinus className="text-3xl " />
          ) : (
            <FiPlus className="text-3xl " />
          )}
        </button>
      </div>
      {faqs && <p className="text-left pl-5">{prop.answer}</p>}
    </div>
  );
};
