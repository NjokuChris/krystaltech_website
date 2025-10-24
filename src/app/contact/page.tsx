import React from "react";

//coms
import NavBar from "@/_components/NavBar";
import MainNav from "@/_components/MainNav";
import Footer from "@/_components/Footer";
import { BiMailSend, BiSolidPhone } from "react-icons/bi";
import { PiMapPinFill } from "react-icons/pi";

const Page = () => {
  return (
    <main className="bg-orange-50 text-center font-sans">
      <NavBar />
      <div className="relative flex items-center justify-center h-full">
        <MainNav />
      </div>
      <div className="p-4">
        <h1 className="text-6xl md:text-7xl font-bold text-black mb-5 mt-50 md:mt-30">
          Contact Us
        </h1>
        <p className="text-black/70 text-lg mb-10 md:w-[40%] mx-auto">
          If you have any questions or would like to learn more about our
          services, please don&apos;t hesitate to contact us. We would love to
          hear from you!
        </p>{" "}
      </div>

      <section
        style={{ backgroundImage: `url("/contact-bg.jpg")` }}
        className="relative bg-cover bg-center h-fit shadow-2xl mb-30 p-10 md:p-20 font-sans
        flex flex-col justify-center items-center gap-20"
      >
        <div className="absolute inset-0 bg-blue-900/40 z-0"></div>
        <div className="relative z-10">
          <ul className="flex gap-20 justify-center items-center flex-wrap">
            <li className="flex flex-col justify-center items-center gap-2">
              <div className="bg-white p-6 rounded-full hover:animate-bounce">
                <PiMapPinFill className="text-orange-600 text-4xl" />{" "}
              </div>{" "}
              123 Main St, Anytown, USA{" "}
              <p className="text-sm font-bold">Our Office</p>
            </li>
            <li className="flex flex-col justify-center items-center gap-2">
              {" "}
              <div className="bg-white p-6 rounded-full hover:animate-bounce">
                <BiSolidPhone className="text-orange-600 text-4xl" />{" "}
              </div>
              <p className="text-white">+234 806 244 2682</p>
              <p className="text-white font-bold">Call Us</p>
            </li>
            <li className="flex flex-col justify-center items-center gap-2">
              <div className="bg-white p-6 rounded-full hover:animate-bounce">
                <BiMailSend className="text-orange-600 text-4xl" />{" "}
              </div>
              <p className="text-white">support@krystaltechhub.com</p>
              <p className="text-sm font-bold">Our Mailbox</p>{" "}
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-md p-10 text-black z-10 relative">
          <h3 className="text-3xl mb-8 font-semibold">
            Send us a message instantly
          </h3>

          <form className="flex flex-col justify-center items-center gap-5 w-full text-left">
            {/* Grid for inputs */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full">
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="mb-1 font-medium">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full h-[50px] px-4 rounded-md border border-black/20 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="email" className="mb-1 font-medium">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-[50px] px-4 rounded-md border border-black/20 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="phone" className="mb-1 font-medium">
                  Your Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full h-[50px] px-4 rounded-md border border-black/20 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="company" className="mb-1 font-medium">
                  Company Name
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="Enter your company name"
                  className="w-full h-[50px] px-4 rounded-md border border-black/20 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Textarea and button full width */}
            <div className="w-full flex flex-col gap-3">
              <label htmlFor="message" className="font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                placeholder="Write your message..."
                className="w-full h-[150px] px-4 py-3 rounded-md border border-black/20 focus:outline-none focus:border-orange-500 resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full h-[50px] bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200 font-semibold"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Page;
