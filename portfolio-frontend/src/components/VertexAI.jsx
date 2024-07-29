import React from 'react';

const Vertex = () => {
  return (
    <div className='min-h-screen my-32 px-4'>
      <h4 className="text-center text-gray-900 font-bold text-4xl mb-12">SmartPrep AI Toolkit</h4>
      <div className="flex flex-wrap justify-center gap-8">
        {/* Vertex AI Chat Application Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-sm w-full">
          <img src="vertex.png" alt="Vertex AI Chat Application" className="rounded-lg mb-4 w-full h-40 object-cover" />
          <h5 className="text-gray-800 text-lg font-semibold mb-2">Vertex AI Chat Application</h5>
          <p className="text-gray-600 mb-4">Need quick answers to your questions? Ready to get started? Try out our Vertex AI Chat Application now!!!</p>
          <a href="https://chat-flask-app-gjfdt3ddgq-uc.a.run.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out">Visit</a>
        </div>

        {/* Vertex AI Summarizer Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-sm w-full">
          <img src="vertex2.png" alt="Vertex AI Summarizer" className="rounded-lg mb-4 w-full h-40 object-cover" />
          <h5 className="text-gray-800 text-lg font-semibold mb-2">Vertex AI Summarizer</h5>
          <p className="text-gray-600 mb-4">Looking for concise summaries? Want to quickly grasp key points? Try out our Vertex AI Summarizer now!</p>
          <a href="https://vertex-summarizer-gjfdt3ddgq-el.a.run.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out">Visit</a>
        </div>

        {/* Enhance Communication Skills Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-sm w-full">
          <img src="generative.png" alt="Generative Video Analytics" className="rounded-lg mb-4 w-full h-40 object-cover" />
          <h5 className="text-gray-800 text-lg font-semibold mb-2">Enhance Communication Skills</h5>
          <p className="text-gray-600 mb-4">Want to enhance your communication skills and gain valuable insights from AI? Follow these steps:</p>
          <ul className="text-gray-600 list-disc list-inside mb-4">
            <li>Answer the interview question.</li>
            <li>Record yourself on YouTube.</li>
            <li>Upload the YouTube URL and ask AI for feedback on how to improve.</li>
          </ul>
          <p className="text-gray-600 mb-4">Get started today and take your interview preparation to the next level!</p>
          <a href="https://colab.research.google.com/drive/1rMKD_v63NafzCCYbyyfWWr8I7oxQOd0t#scrollTo=DXTyDn89rv6H" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out">Visit</a>
        </div>
      </div>
    </div>
  );
};

export default Vertex;
