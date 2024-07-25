import React from 'react';

const Opportunities = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Open Source Opportunities</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-gray-300">
            <div className="p-4 bg-gray-200 font-bold border-b border-gray-300">Crowdsource Learning Community</div>
            <div className="p-4 border-b border-gray-300">
              <a
                href="https://rsvp.withgoogle.com/events/crowdsource-learning-community/home"
                className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded inline-block no-underline"
              >
                Visit
              </a>
            </div>

            <div className="p-4 bg-gray-200 font-bold border-b border-gray-300">Google Developer Student Club Lead</div>
            <div className="p-4 border-b border-gray-300">
              <a
                href="https://developers.google.com/community/gdsc/leads"
                className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded inline-block no-underline"
              >
                Visit
              </a>
            </div>

            <div className="p-4 bg-gray-200 font-bold border-b border-gray-300">Google Summer of Code</div>
            <div className="p-4 border-b border-gray-300">
              <a
                href="https://summerofcode.withgoogle.com/"
                className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded inline-block no-underline"
              >
                Visit
              </a>
            </div>

            <div className="p-4 bg-gray-200 font-bold">Google Student Ambassador</div>
            <div className="p-4">
              <a
                href="https://docs.google.com/document/d/1FGYxtollvsRiIlk4Kn4QoYRsxPy0s-FfDYv5GeHs5Qc/edit"
                className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded inline-block no-underline"
              >
                Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Opportunities;
