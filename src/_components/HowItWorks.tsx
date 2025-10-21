import React from "react";
import {
  PiNumberSquareFourFill,
  PiNumberSquareOneFill,
  PiNumberSquareThreeFill,
  PiNumberSquareTwoFill,
} from "react-icons/pi";

const HowItWorks = () => {
  return (
    <section className="bg-white w-full overflow-hidden md:px-20 py-20 px-4 flex flex-col justify-center items-center">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl capitalize font-bold mb-2 text-gray-700">
          How It Works
        </h2>
        <p className="text-lg max-w-2xl mx-auto text-gray-400">
          We simplify innovation and transform your business in these four
          powerful steps.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
        {/* Step 1 */}
        <div className="flex flex-col items-start p-8 mt-10 rounded-2xl rounded-tr-none bg-gray-800 text-white hover:shadow-lg transition">
          <PiNumberSquareOneFill className="text-5xl text-orange-500 mb-4" />
          <h4 className="text-xl font-semibold mb-2">Connect With Us</h4>.
          <p className="text-gray-400">
            Join our network of innovators building the future of technology.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-start p-8 mb-10 rounded-t-2xl bg-orange-500 text-white hover:shadow-lg transition">
          <PiNumberSquareTwoFill className="text-5xl mb-4" />
          <h4 className="text-xl font-semibold mb-2">Share Your Vision</h4>
          <p className="text-gray-200">
            Tell us your goals, challenges, and the ideas driving your mission.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-start mt-10 p-8 rounded-b-2xl bg-gray-800 hover:shadow-lg transition text-white">
          <PiNumberSquareThreeFill className="text-5xl text-orange-500 mb-4" />
          <h4 className="text-xl font-semibold mb-2">Collaborate and Build</h4>
          <p className="text-gray-400">
            Work with our experts to develop scalable, high-impact digital
            solutions.
          </p>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-start p-8 mb-10 rounded-2xl rounded-bl-none bg-orange-500 text-white hover:shadow-lg transition">
          <PiNumberSquareFourFill className="text-5xl mb-4" />
          <h4 className="text-xl font-semibold mb-2">Launch and Grow</h4>
          <p className="text-gray-200">
            Deploy your project, access resources, and expand through our tech
            ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
