"use client";
import React, { useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const images = [
  { img: "/green/green1.jpg", title: "Hackathon 2024" },
  { img: "/green/green2.jpg", title: "Innovators' Challenge" },
  {img: "/green/green3.jpg", title: "Code Fest" },
  { img: "/green/green4.jpg", title: "Tech Titans" },
];

const Scroll = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const maxScrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      console.log(maxScrollWidth,scrollContainer.clientWidth);

      const autoScroll = setInterval(() => {
        const scrollLeft = scrollContainer.scrollLeft;

        if (scrollLeft >= maxScrollWidth) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: scrollContainer.clientWidth+4, behavior: 'smooth' });
        }
      }, 2000);

      return () => clearInterval(autoScroll); // Cleanup the interval on component unmount
    }
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.clientWidth; // Width of a single card
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className='relative flex justify-center w-full select-none'>
      <div className='w-full max-w-screen-xl relative'>
        <div className='relative flex w-full px-4 items-center'>

          {/* Left Arrow (hidden on small screens) */}
          <button
            onClick={() => scroll('left')}
            className='hidden md:block absolute left-0 rounded-full p-2 hover:bg-blue-600 bg-gray-200'>
            <IoIosArrowBack />
          </button>

          {/* Hackathon Cards Container */}
          <div
            ref={scrollContainerRef}
            className='flex gap-2 rounded-2xl overflow-x-auto w-full scrollbar-hide snap-x snap-mandatory'
            style={{ scrollBehavior: 'smooth' }}
          >
            {images.map((hack, index) => (
              <div
                key={index}
                className='bg-white rounded-2xl snap-start lg:min-w-[610px] min-w-[100%]'
              >
                <img
                  src={hack.img}
                  alt={hack.title}

                  className='lg:h-[300px] h-[200px] w-full' // lg:h-[300px] h-[200px]

                />
              </div>
            ))}
          </div>

          {/* Right Arrow (hidden on small screens) */}
          <button
            onClick={() => scroll('right')}
            className='hidden md:block absolute right-0 hover:bg-blue-600 rounded-full p-2 bg-gray-200'>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scroll;
