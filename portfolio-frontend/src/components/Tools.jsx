import React from 'react';
import { FiArrowRight } from 'react-icons/fi'; // Arrow icon from react-icons
import { FaLaptopCode, FaFileAlt, FaHeadset, FaTasks, FaFileSignature, FaCamera, FaRobot, FaCheckCircle } from 'react-icons/fa'; // Example icons for each card
import { useRouter } from 'next/navigation';

const toolsData = [
  {
    title: "Portfolio Themes",
    description: "Showcase your projects with stunning, customizable portfolio themes.",
    icon: <FaLaptopCode className="text-blue-600 text-3xl mb-4" />,
    route : '/portfolio'
  },
  {
    title: "Resume Templates",
    description: "Stand out with professionally designed resume templates tailored for your industry.",
    icon: <FaFileAlt className="text-green-600 text-3xl mb-4" />,
    route : '/resume'
  },
  {
    title: "Mock Interview",
    description: "Prepare for your next opportunity with realistic mock interview simulations.",
    icon: <FaHeadset className="text-indigo-600 text-3xl mb-4" />,
    route : '/mock/start'
  },
  {
    title: "Assessment",
    description: "Test your skills with personalized assessments and gain valuable feedback.",
    icon: <FaTasks className="text-yellow-600 text-3xl mb-4" />,
    route : '/test/start'
  },
  {
    title: "AI Text Summarizer",
    description: "Condense large content effortlessly with our AI-powered text summarizer.",
    icon: <FaFileSignature className="text-red-600 text-3xl mb-4" />,
    route : '/summarize'
  },
  {
    title: "AI Video Analysis",
    description: "Get actionable insights from videos with AI-driven analysis tools.",
    icon: <FaCamera className="text-purple-600 text-3xl mb-4" />,
    route : '/videoanalysis'
  },
  {
    title: "AI Chat Bot",
    description: "Enhance user interaction with our intelligent AI chatbot.",
    icon: <FaRobot className="text-orange-600 text-3xl mb-4" />,
    route : '/ai'
  },
  {
    title: "Resume Score Checker",
    description: "Instantly score your resume and optimize it for success.",
    icon: <FaCheckCircle className="text-teal-600 text-3xl mb-4" />,
    route : '/resumescore'
  }
];

const Tools = () => {

  const router = useRouter();
  return (
    <div className="py-12 px-4 lg:w-4/5 mx-auto pt-20" id='tools'>
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-8">Explore Our Powerful Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {toolsData.map((tool, index) => (
          <div onClick={()=>router.push(tool?.route)} key={index} className="relative bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between">
            {/* Arrow icon on top right */}
            <FiArrowRight className="absolute top-4 right-4 text-gray-600 text-2xl" />
            
            {/* Icon */}
            <div className="flex justify-center mb-4">
              {tool.icon}
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">{tool.title}</h3>
            
            {/* Description */}
            <p className="text-gray-600 text-sm text-center">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
