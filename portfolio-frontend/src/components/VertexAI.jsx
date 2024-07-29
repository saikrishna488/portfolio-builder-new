import React from 'react';

const Vertex = () => {
  return (
    <div className='min-h-screen my-32'>
      <h4 className="text-center text-black font-semibold text-4xl m-4"> SmartPrep AI Toolkit</h4>
      <div className="flex flex-col md:flex-row justify-center gap-5 items-center mb-10 flex-wrap">
        <div className="flex flex-col justify-center items-center bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out w-full md:w-1/3 lg:w-1/4">
          <p className="text-left text-white mt-2 font-semibold ">Need quick answers to your questions? Ready to get started? Try out our Vertex AI Chat Application now!!!</p>
          <img src="vertex.png" alt="Vertex AI Chat Application" className="mt-4 rounded-lg w-full" />
          <a href="https://chat-flask-app-gjfdt3ddgq-uc.a.run.app/" target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out">Visit</a>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out w-full md:w-1/3 lg:w-1/4">
          <p className="text-left text-white mt-2 font-semibold">Looking for concise summaries? Want to quickly grasp key points? Try out our Vertex AI Summarizer now!</p>
          <img src="vertex2.png" alt="Vertex AI Summarizer" className="mt-4 rounded-lg w-full" />
          <a href="https://vertex-summarizer-gjfdt3ddgq-el.a.run.app/" target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out">Visit</a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-5 items-center flex-wrap">
        <div className="flex flex-col justify-center items-center bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out w-full md:w-1/3 lg:w-1/4">
          <h5 className="text-left text-white mt-4 text-xl font-semibold ">Enhance Communication Skills</h5>
          <p className="text-center text-white mt-2">Want to enhance your communication skills and gain valuable insights from AI? Follow these steps:</p>
          <ul className="text-left text-white mt-2 list-disc list-inside">
            <li>Answer the interview question.</li>
            <li>Record yourself on YouTube.</li>
            <li>Upload the YouTube URL and ask AI for feedback on how to improve.</li>
          </ul>
          <p className="text-center text-white mt-2">Get started today and take your interview preparation to the next level!</p>
          <img src="generative.png" alt="Generative Video Analytics" className="mt-4 rounded-lg w-full" />
          <a href="https://colab.research.google.com/drive/1rMKD_v63NafzCCYbyyfWWr8I7oxQOd0t#scrollTo=DXTyDn89rv6H" target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out">Visit</a>
        </div>
      </div>
    </div>
  );
};

export default Vertex;
