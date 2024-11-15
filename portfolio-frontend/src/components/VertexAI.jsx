"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaRobot, FaRegListAlt, FaVideo } from 'react-icons/fa';

const Vertex = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen lg:w-[80%] w-full mx-auto py-16 px-4 sm:px-6 lg:px-12">
      <h4 className="text-center text-3xl font-bold text-gray-900 mb-16">
        SmartPrep AI Toolkit
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Vertex AI Chat Application Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-sm mx-auto h-full flex flex-col">
          <div className="flex items-center justify-center bg-blue-100 p-4 rounded-full mb-6">
            <FaRobot className="text-4xl text-blue-600" />
          </div>
          <h5 className="text-xl font-semibold text-gray-800 mb-2">Vertex AI Chat Application</h5>
          <p className="text-gray-600 mb-4 flex-1">Get quick, AI-powered responses for all your questions. Start chatting with Vertex AI!</p>
          <button
            onClick={() => router.push('/vertexai')}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          >
            Start Chatting
          </button>
        </div>

        {/* Vertex AI Summarizer Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-sm mx-auto h-full flex flex-col">
          <div className="flex items-center justify-center bg-green-100 p-4 rounded-full mb-6">
            <FaRegListAlt className="text-4xl text-green-600" />
          </div>
          <h5 className="text-xl font-semibold text-gray-800 mb-2">Vertex AI Summarizer</h5>
          <p className="text-gray-600 mb-4 flex-1">Quickly summarize any content or document. Use the AI Summarizer to save time!</p>
          <button
            onClick={() => router.push('/summerize')}
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 ease-in-out"
          >
            Try Summarizing
          </button>
        </div>

        {/* Enhance Communication Skills Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-sm mx-auto h-full flex flex-col">
          <div className="flex items-center justify-center bg-purple-100 p-4 rounded-full mb-6">
            <FaVideo className="text-4xl text-purple-600" />
          </div>
          <h5 className="text-xl font-semibold text-gray-800 mb-2">Video Analysis</h5>
          <p className="text-gray-600 mb-4 flex-1">Improve your communication skills by getting AI-driven feedback on your videos. Start your practice today!</p>
          <button
            onClick={() => router.push('/videoanalysis')}
            className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300 ease-in-out"
          >
            Start Improving
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vertex;
