import React from "react";
import { AiOutlineMail } from "react-icons/ai";

const SubscriptionSection = () => {
  return (
    <div className="flex items-center font-montserrat justify-center p-6">
      <div className="w-full bg-gray-900 p-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-500 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Stay updated with our latest tours and offers.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center">
  <div className="flex w-full sm:w-auto border py-3 px-4 bg-white items-center gap-2">
    <AiOutlineMail className="text-gray-400" size={20} />
    <input
      type="email"
      placeholder="Enter your email"
      className="w-full sm:w-auto outline-none"
    />
  </div>
  <button
    type="submit"
    className="w-full sm:w-auto px-6 py-3 bg-gray-500 text-white hover:bg-black transition duration-300"
  >
    Subscribe
  </button>
</form>

      </div>
    </div>
  );
};

export default SubscriptionSection;