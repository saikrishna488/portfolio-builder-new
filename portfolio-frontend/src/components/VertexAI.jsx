"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const Vertex = () => {
  const router = useRouter();

  return (
    <div className='min-h-screen my-32 px-4'>
      <h4 className="text-center text-gray-900 font-bold text-4xl mb-12">SmartPrep AI Toolkit</h4>
      <div className="flex flex-wrap justify-center gap-8">
        
        {/* Vertex AI Chat Application Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-sm w-full flex flex-col">
          <img src="vertex.png" alt="Vertex AI Chat Application" className="rounded-lg mb-4 w-full h-40 object-cover" />
          <div className="flex-1">
            <h5 className="text-gray-800 text-xl font-semibold mb-2">Vertex AI Chat Application</h5>
            <p className="text-gray-600 mb-4">Need quick answers to your questions? Ready to get started? Try out our Vertex AI Chat Application now!</p>
          </div>
          <button 
            onClick={() => router.push('/vertexai')} 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          >
            Visit
          </button>
        </div>

        {/* Vertex AI Summarizer Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-sm w-full flex flex-col">
          <img src="vertex2.png" alt="Vertex AI Summarizer" className="rounded-lg mb-4 w-full h-40 object-cover" />
          <div className="flex-1">
            <h5 className="text-gray-800 text-xl font-semibold mb-2">Vertex AI Summarizer</h5>
            <p className="text-gray-600 mb-4">Looking for concise summaries? Want to quickly grasp key points? Try out our Vertex AI Summarizer now!</p>
          </div>
          <button 
            onClick={() => router.push('/summerize')} 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          >
            Visit
          </button>
        </div>

        {/* Enhance Communication Skills Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-sm w-full flex flex-col">
          <img src="generative.png" alt="Generative Video Analytics" className="rounded-lg mb-4 w-full h-40 object-cover" />
          <div className="flex-1">
            <h5 className="text-gray-800 text-xl font-semibold mb-2">Enhance Communication Skills</h5>
            <p className="text-gray-600 mb-4">Want to enhance your communication skills and gain valuable insights from AI? Follow these steps:</p>
            <ul className="text-gray-600 list-disc list-inside mb-4">
              <li>Answer the interview question.</li>
              <li>Record yourself on YouTube.</li>
              <li>Upload the YouTube URL and ask AI for feedback on how to improve.</li>
            </ul>
            <p className="text-gray-600 mb-4">Get started today and take your interview preparation to the next level!</p>
          </div>
          <button 
            onClick={() => router.push('/videoanalysis')} 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          >
            Visit
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Vertex;
