import Footer from "@/_components/Footer";
import MainNav from "@/_components/MainNav";
import NavBar from "@/_components/NavBar";
import React from "react";

const page = () => {
  return (
    <main className="bg-orange-50 text-center font-sans">
      <NavBar />
      <div className="relative flex items-center justify-center h-full">
        <MainNav />
      </div>
      <div className="p-4">
        <h1 className="text-6xl md:text-7xl font-bold text-black mb-5 mt-50 md:mt-30">
          Our Services
        </h1>
        <p className="text-black/70 text-lg mb-10 md:w-[40%] mx-auto">
          Get to know the services krystal technologies offer.
        </p>{" "}
      </div>

      <section className="p-20 flex gap-5 w-full"></section>
      <Footer />
    </main>
  );
};

export default page;
