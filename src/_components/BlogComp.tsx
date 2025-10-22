import React from "react";

const BlogComp: React.FC = () => {
  return (
    <article
      className="group min-w-[85%] sm:min-w-[60%] md:min-w-[35%] lg:min-w-[30%] xl:min-w-[25%] h-[60vw] sm:h-[45vw] md:h-[27vw] rounded-xl p-6 flex flex-col justify-between bg-cover bg-center relative snap-start transition-transform duration-300 hover:scale-105"
      style={{
        backgroundImage: "url('/people-poiting-up.png')",
      }}
    >
      <div className="bg-orange-600 rounded w-[60px] h-[60px] flex flex-col justify-center items-center text-white text-sm font-semibold">
        <p>05</p>
        <p className="font-bold text-lg">May</p>
      </div>

      <h3 className="capitalize text-white text-xl md:text-2xl font-bold group-hover:underline drop-shadow-lg">
        We usually work for Website development, eCommerce
      </h3>
    </article>
  );
};

export default BlogComp;
