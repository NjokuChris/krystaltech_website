import React from "react";
import BlogComp from "./BlogComp";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const BlogSection = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-5 -mb-100 ">
      <h2 className="bg-gray-950 text-xs capitalize text-orange-600 rounded-full py-2 px-3 w-fit">
        Our Blogs
      </h2>

      <p className="text-6xl font-bold mx-auto text-white">
        Exclusive IT Solutions
      </p>
      <div className="w-full h-fit flex justify-between  items-center px-10">
        <button className="text-white h-fit w-fit bg-orange-600 p-5 text-2xl rounded-full font-bold transition-all duration-300 hover:bg-orange-700 hover:scale-110">
          <BsArrowLeft />
        </button>
        <div className="flex gap-10 justify-center items-center ">
          <BlogComp /> <BlogComp />
        </div>{" "}
        <button className="text-white h-fit w-fit bg-orange-600 p-5 text-2xl rounded-full font-bold transition-all duration-300 hover:bg-orange-700 hover:scale-110">
          <BsArrowRight />
        </button>
      </div>
    </section>
  );
};

export default BlogSection;
