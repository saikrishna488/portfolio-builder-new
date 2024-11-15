"use client";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Scroll from "./Scroll";

const HeroSectionWithCarousel = () => {
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-8">
            {/* Hero Section */}
            <div className="lg:w-[80%] w-full bg-white rounded-lg  p-6 flex flex-col md:flex-row items-center mb-8">
                {/* Left: GIF */}
                <div className="md:w-1/2 w-full flex justify-center mb-6 md:mb-0">
                    <img
                        src="/gifs/green.gif" // Replace with your GIF
                        alt="AI-Powered Platform"
                        className=" lg:h-[400px] md:w-full rounded-lg shadow-sm"
                        width={300}
                    />
                </div>

                {/* Right: Text */}
                <div className="md:w-1/2 w-full md:pl-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        India’s first AI-powered mock interview platform
                    </h1>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        Equipping students with future-ready skills and empowering them to build a sustainable world.
                    </p>
                    <p className="mt-4 text-sm md:text-base text-gray-600">
                        Get future-ready with green skills and contribute to a sustainable world.
                    </p>
                </div>

            </div>
                
                {/* Carousel */}
                <Scroll/>
        </div>
    );
};

export default HeroSectionWithCarousel;
