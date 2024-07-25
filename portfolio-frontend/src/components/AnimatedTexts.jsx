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
    <div className="h-20 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-center animate-fadeIn">
        {texts[currentTextIndex]}
      </h1>
    </div>
  );
};

export default AnimatedText;
