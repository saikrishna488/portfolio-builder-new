import React from 'react';

const Contributor = () => {
  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-7xl mx-auto py-16">
        <div className="text-center mb-12">
          <h4 className="text-4xl font-extrabold text-black mb-6">
            Ready to be an Open-Source Contributor?
          </h4>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          <iframe
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/Po-WbVjPxCI?si=sD2x9408xXlErcOr"
            title="YouTube video player"
            className="shadow-lg rounded-lg"
            allowFullScreen
          ></iframe>
          <iframe
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/RHETubkhjY8?si=fRUfpPEgtqAz14fc"
            title="YouTube video player"
            className="shadow-lg rounded-lg"
            allowFullScreen
          ></iframe>
        </div>
        <div className="text-center mt-10">
          <a
            href="https://ssocseason3.devfolio.co/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click Here to Join
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contributor;
