import React from 'react';

const Vertex = () => {
  return (
    <>
      <div className=' min-h-screen my-32'>
        <h4 className="text-center text-black font-semibold text-lg">Leverage the Use of AI</h4>
        <div className="flex flex-row justify-center gap-5 items-center mb-10 flex-wrap">
          <div className="flex flex-col justify-center items-center bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h5 className="text-center text-white mt-4 text-xl font-semibold">Vertex AI Chat Application</h5>
            <p className="text-center text-white mt-2">(Communication and Collaboration with Vertex AI Application)</p>
            <img src="vertex.png" alt="Vertex AI Chat Application" className="mt-4 rounded-lg" height={100} width={500} />
            <a href="https://chat-flask-app-gjfdt3ddgq-uc.a.run.app/" target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out">Visit</a>
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h5 className="text-center text-white mt-4 text-xl font-semibold">Vertex AI Summarizer</h5>
            <p className="text-center text-white mt-2">(Experience Effortless Summarization with VertexAI Summarizer)</p>
            <img src="vertex2.png" alt="Vertex AI Summarizer" className="mt-4 rounded-lg" height={100} width={500} />
            <a href="https://vertex-summarizer-gjfdt3ddgq-el.a.run.app/" target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out">Visit</a>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-5 items-center flex-wrap">
          <div className="flex flex-col justify-center items-center bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h5 className="text-center text-white mt-4 text-xl font-semibold">Generative Video Analytics</h5>
            <p className="text-center text-white mt-2">Empower Decision Making with Generative Video Analytics</p>
            <img src="generative.png" alt="Generative Video Analytics" className="mt-4 rounded-lg" height={100} width={500} />
            <a href="https://cf9cb8e4b5c2ed1de9.gradio.live/" target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out">Visit</a>
          </div>
        </div>
      </div>

    </>
  );
};

export default Vertex;
