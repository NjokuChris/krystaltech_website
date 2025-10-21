import React from "react";

const BlogComp = () => {
  return (
    <article
      className="w-[35vw] h-[27vw] rounded-xl p-10 flex flex-col justify-between "
      style={{
        backgroundImage: `url('/people-poiting-up.png')`,
      }}
    >
      <div className="bg-orange-600 rounded w-[70px] h-[70px] flex flex-col justify-center items-center ">
        <p>05</p>
        <p className="font-bold text-xl  ">May</p>
      </div>

      <h3 className="capitalize text-white dark:text-white text-2xl font-bold hover:underline">
        We usually work for Website development, eCommerce
      </h3>
    </article>
  );
};

export default BlogComp;
