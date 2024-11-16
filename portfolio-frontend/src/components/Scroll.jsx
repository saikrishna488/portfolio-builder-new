import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Scroll = () => {
  const [focus, setFocus] = useState('/green/green1.jpg'); // Current image
  const [index, setIndex] = useState(0); // Current index

  const images = [
    '/green/green1.jpg',
    '/green/green2.jpg',
    '/green/green3.jpg',
    '/green/green4.jpg',
  ];

  useEffect(() => {
    // Set up an interval to auto-scroll images
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length); // Increment index cyclically
    }, 3000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [images.length]);

  useEffect(() => {
    setFocus(images[index]); // Update the image when index changes
  }, [index]);

  const handleArrow = (dir) => {
    if (dir === 'left') {
      setIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else if (dir === 'right') {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  return (
    <div className="pt-4 w-full h-full">
      <div className="flex flex-row gap-2 w-full justify-center items-center">
        <ArrowLeft className="cursor-pointer" onClick={() => handleArrow('left')} />
        <div className="lg:h-[300px] h-[200px] lg:w-[500px] w-[85%]  transition-transform duration-700 ease-in-out">
          <img
            src={focus}
            alt="green"
            className="rounded-lg shadow-md h-full w-full object-cover"
          />
        </div>
        <ArrowRight
          className="cursor-pointer"
          onClick={() => handleArrow('right')}
        />
      </div>
    </div>
  );
};

export default Scroll;
