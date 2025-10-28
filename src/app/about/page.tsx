import React from "react";

//from next
import Image from "next/image";
//coms
import NavBar from "@/_components/NavBar";
import MainNav from "@/_components/MainNav";
import Footer from "@/_components/Footer";

//icons

const Page = () => {
  return (
    <main className="bg-orange-50 text-center font-sans">
      <NavBar />
      <div className="relative flex items-center justify-center h-full">
        <MainNav />
      </div>
      <div className="p-4">
        <h1 className="text-6xl md:text-7xl font-bold text-black mb-5 mt-50 md:mt-30">
          About Us
        </h1>
        <p className="text-black/70 text-lg mb-10 md:w-[40%] mx-auto">
          Get to know about krystal technologies better.
        </p>{" "}
      </div>

      <section className="p-20 flex gap-5 w-full">
        <div>
          <p className="text-left text-black w-[65%] ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ab
            vitae, optio odit consequuntur ipsum quam. Atque ad facere
            accusantium amet reiciendis minus doloribus quae pariatur incidunt
            aliquid corrupti non excepturi porro quas fugit laborum hic unde,
            nemo quis ex. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Molestias eius nobis adipisci tempore id blanditiis doloribus
            dolor, eligendi atque laborum! Quisquam maiores pariatur iusto
            possimus temporibus, dolore, repudiandae cupiditate vero, beatae
            quae aut ut! Architecto ab nemo dolor aliquid saepe. Praesentium
            nobis soluta facilis suscipit consectetur, neque nulla similique
            nostrum accusamus! In ad error ipsum assumenda, dolorum incidunt
            modi amet. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis nobis repellat omnis aspernatur obcaecati. Voluptates
            deserunt ex reiciendis at. Neque a molestiae provident incidunt
            expedita, fugiat nam aut sint optio aliquam assumenda vero quidem
            accusantium beatae sit facere adipisci explicabo illo quasi laborum
            esse similique! Officia harum fugiat odit. Possimus.
          </p>
        </div>
        <div>
          <Image
            src="/testimonial-2.png"
            alt="Customer testimonial"
            width={1900}
            height={1900}
            className="rounded"
          />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Page;
