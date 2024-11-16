"use client";
import React from "react";
import Scroll from "./Scroll";

const HeroSectionWithCarousel = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-2 items-center justify-center py-6">
      {/* Hero Section */}
      <div className="lg:w-[80%] shadow-md  w-full justify-start bg-white rounded-lg flex-wrap flex flex-row ">
        {/* Left: GIF */}
        <div className="flex justify-center lg:w-[400px] w-full p-2">
          <img
            src="/gifs/green.gif" // Replace with your GIF
            alt="AI-Powered Platform"
            className="h-[400px] w-full rounded-lg shadow-sm"
          />
        </div>

        {/* Right: Text */}
        <div className="flex justify-center flex-col px-4">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            India’s first AI-powered mock interview platform
          </h1>
          <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
            Equipping students with future-ready skills and empowering them to build a sustainable world.
          </p>
          <p className="mt-3 text-xs md:text-sm text-gray-600">
            Get future-ready with green skills and contribute to a sustainable world.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <Scroll />
    </div>
  );
};

export default HeroSectionWithCarousel;
