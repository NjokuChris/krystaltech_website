"use client";
import React, { useRef } from "react";
import BlogComp from "./BlogComp";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const BlogSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="-mb-100 w-full flex flex-col justify-center items-center gap-5 py-16">
      <h2 className="bg-gray-950 text-xs capitalize text-orange-600 rounded-full py-2 px-3 w-fit">
        Our Blogs
      </h2>

      <p className="text-4xl md:text-6xl font-bold mx-auto text-center text-white">
        Exclusive IT Solutions
      </p>

      <div className="relative w-full flex justify-center items-center px-5 md:px-10">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-2 text-white bg-orange-600 p-4 text-2xl rounded-full font-bold transition-all duration-300 hover:bg-orange-700 hover:scale-110 z-10"
        >
          <BsArrowLeft />
        </button>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory scrollbar-hide py-5 w-full"
        >
          {/* Repeat Blog Components */}
          <BlogComp />
          <BlogComp />
          <BlogComp />
          <BlogComp />
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-2 text-white bg-orange-600 p-4 text-2xl rounded-full font-bold transition-all duration-300 hover:bg-orange-700 hover:scale-110 z-10"
        >
          <BsArrowRight />
        </button>
      </div>
    </section>
  );
};

export default BlogSection;
