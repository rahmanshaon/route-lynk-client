import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const NewsletterCTA = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();

    toast.success("Thank you for subscribing to our newsletter!");

    e.target.reset();
  };

  return (
    <div className="bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="flex flex-col justify-center items-center gap-3">
          <FaPaperPlane className="text-white text-3xl" />
          <h2 className="text-4xl font-black text-gradient">
            Stay in the Loop
          </h2>
        </div>

        <p className="max-w-2xl mx-auto mt-4 text-sm text-gray-300">
          Subscribe to our newsletter to get the latest updates about flash
          sales, new route schedules, and holiday discounts for Bus, Train, and
          Flight tickets.
        </p>

        {/* Form Container */}
        <div className="mt-8 flex justify-center">
          {/* 3. Attach the new handler to the form's onSubmit event */}
          <form onSubmit={handleSubscribe} className="w-full max-w-lg">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-gray-900 border border-gray-700 p-2 rounded-xl sm:rounded-full shadow-lg">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full grow px-4 py-2.5  text-gray-200 bg-transparent focus:outline-none text-center sm:text-left"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto btn btn-gradient border-none rounded-lg sm:rounded-full shrink-0"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterCTA;
