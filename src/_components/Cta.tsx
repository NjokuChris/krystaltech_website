import React from "react";

const Cta: React.FC = () => {
  return (
    <div
      className="
        w-[90%] md:w-[80%] 
        h-[300px] md:h-[350px] 
        bg-cover bg-center 
        rounded-xl 
        px-6 sm:px-10 md:px-14 
        py-10 md:pb-20 
        -mt-70 md:-mt-70
        flex flex-col md:flex-row 
        justify-center md:justify-start 
        items-start md:items-center 
        gap-6 md:gap-[15%]
      "
      style={{
        backgroundImage: `url('/people-poiting-up.png')`,
      }}
    >
      <div className="w-full md:w-fit h-full flex flex-col items-start justify-center text-left">
        <h2 className="text-sm sm:text-base md:text-xl text-orange-600 font-semibold mb-2">
          We Carry More Than Just Good Coding Skills
        </h2>

        <p className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
          Let’s Build Your Website!
        </p>
      </div>

      <button
        className="
          bg-orange-500 
          hover:bg-orange-600 
          transition-all 
          duration-300 
          py-3 sm:py-4 
          px-5 sm:px-6 
          font-semibold 
          rounded-lg 
          text-white 
          shadow-lg 
          mt-5 md:mt-0
        "
      >
        Get Started
      </button>
    </div>
  );
};

export default Cta;
