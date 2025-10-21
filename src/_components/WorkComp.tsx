import React from "react";

const WorkComp = () => {
  return (
    <div className="group">
      <div
        className=" rounded-lg w-[25vw] h-[25vw] bg-cover bg-top hover:filter hover:brightness-75 transition-all duration-300 "
        style={{
          backgroundImage: "url('/the-dev.jpg')",
        }}
      >
        <div className="bg-[#f9f6f6] relative top-[23vw] left-0 w-[80%] h-[100px] border-l-15 border-orange-600 flex gap-3 px-5 rounded-r-lg shadow ">
          <p className="text-7xl font-bold  text-gray-700 group-hover:text-orange-600 group-hover:[webkit-text-stroke:0px_white] transition-all duration-300 my-auto">
            01
          </p>

          <p className="text-black my-auto font-bold text-2xl 3xl:text-4xl">
            IT consultancy solution
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkComp;
