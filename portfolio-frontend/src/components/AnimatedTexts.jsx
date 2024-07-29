import React, { useState, useEffect } from 'react';

const AnimatedText = () => {
  const texts = [
    "AI powered Mock interview",
    "Innovative Way of Learning",
    "Crack your Dreams",
    "All in one Interview Preparation"
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="h-20 flex items-center justify-center w-full px-4">
      <h1
        key={currentTextIndex}
        className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-center overflow-hidden whitespace-nowrap animate-textReveal"
      >
        <span>{texts[currentTextIndex]}</span>
        <span className="animate-blink border-r-2 border-black">&nbsp;</span>
      </h1>
    </div>
  );
};

export default AnimatedText;
