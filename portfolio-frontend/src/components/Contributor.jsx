import React from 'react';

const Contributor = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto py-16">
        <div className="text-center mb-12">
          <h4 className="text-3xl font-extrabold text-gray-900 mb-6">
            Ready to be an Open-Source Contributor?
          </h4>
          <p className="text-lg text-gray-600">
            Watch these videos to get started with contributing to open-source projects. Join the community today!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {/* First Video */}
          <div className="rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <iframe
              width="100%"
              height="300"
              src="https://www.youtube.com/embed/Po-WbVjPxCI?si=sD2x9408xXlErcOr"
              title="YouTube video player"
              className="rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Second Video */}
          <div className="rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <iframe
              width="100%"
              height="300"
              src="https://www.youtube.com/embed/RHETubkhjY8?si=fRUfpPEgtqAz14fc"
              title="YouTube video player"
              className="rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="https://ssocseason3.devfolio.co/"
            className="inline-block px-4 py-2 bg-blue-500 decoration-slice text-white font-medium rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg no-underline transition-all duration-300 "
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the Community
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contributor;
