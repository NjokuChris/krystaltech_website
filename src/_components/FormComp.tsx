import React from "react";

const FormComp = () => {
  return (
    <div className="bg-white rounded-md p-5 md:p-10 text-black z-10 relative shadow-lg">
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
  );
};

export default FormComp;
