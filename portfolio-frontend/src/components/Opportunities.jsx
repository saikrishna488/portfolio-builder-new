import React from 'react';

const Opportunities = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold">Open Source Opportunities</h2>
          <p className="mt-4 text-lg text-gray-700">Explore the various opportunities to contribute and learn from the open-source community.</p>
        </div>
        
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="shadow-md rounded-lg transform hover:scale-105 transition-transform duration-300">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Crowdsource Learning Community</h3>
              <p className="text-gray-700 mb-4">Join a community that leverages collective knowledge to learn and grow together.</p>
              <a
                href="https://rsvp.withgoogle.com/events/crowdsource-learning-community/home"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
              </a>
            </div>
          </div>
          
          <div className="shadow-md rounded-lg transform hover:scale-105 transition-transform duration-300">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Google Developer Student Club Lead</h3>
              <p className="text-gray-700 mb-4">Lead a community of developers and help grow their skills and network.</p>
              <a
                href="https://developers.google.com/community/gdsc/leads"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
              </a>
            </div>
          </div>
          
          <div className="shadow-md rounded-lg transform hover:scale-105 transition-transform duration-300">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Google Summer of Code</h3>
              <p className="text-gray-700 mb-4">Participate in a global program focused on introducing students to open source software development.</p>
              <a
                href="https://summerofcode.withgoogle.com/"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
              </a>
            </div>
          </div>
          
          <div className="shadow-md rounded-lg transform hover:scale-105 transition-transform duration-300">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Google Student Ambassador</h3>
              <p className="text-gray-700 mb-4">Represent Google at your university and help students learn about Google's tools and technologies.</p>
              <a
                href="https://docs.google.com/document/d/1FGYxtollvsRiIlk4Kn4QoYRsxPy0s-FfDYv5GeHs5Qc/edit"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opportunities;
