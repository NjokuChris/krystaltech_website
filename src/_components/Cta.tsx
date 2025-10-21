import React from "react";

const Cta = () => {
  return (
    <div
      className="w-[80%] h-[350px] bg-cover bg-center rounded-xl px-15 pb-20 -mt-100 flex justify-start items-center gap-[15%]"
      style={{
        backgroundImage: `url('/people-poiting-up.png')`,
      }}
    >
      <div className="w-fit h-full flex flex-col items-start justify-center">
        <h2 className=" text-xl text-orange-600 font-semibold">
          We Carry more Than Just Good Coding Skills
        </h2>

        <p className="text-white text-6xl font-bold">
          Let`s Build Your Website!{" "}
        </p>
      </div>
      <button className="bg-orange-500 py-4 px-5 font-semibold rounded h-fit w-fit ">
        Get Started
      </button>
    </div>
  );
};

export default Cta;
