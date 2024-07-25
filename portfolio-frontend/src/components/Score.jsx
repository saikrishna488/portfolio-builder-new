"use client";

import React, { useState } from 'react';

const Score = () => {
  const [score, setScore] = useState(0);

  const submit = (e) => {
    e.preventDefault();
    const file = document.getElementById('file').files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add`, {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          setScore(data.score);
        });
    }
  };

  const getScoreMessage = () => {
    if (score === 0) return null;
    if (score === 40) return '(average)';
    if (score > 40 && score <= 50) return '(Good)';
    if (score > 50) return '(Excellent)';
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-customDarkBlue p-6 sm:p-8 lg:p-12">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-12 max-w-md w-full">
        <h4 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Upload your resume to check score
        </h4>
        <form onSubmit={submit} className="flex flex-col items-center space-y-4">
          <input
            type="file"
            id="file"
            name="upload"
            accept="application/pdf,application/vnd.ms-excel"
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="submit"
            value="Check Score"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-full"
          />
        </form>
        <h5 className="text-center text-gray-700 mt-4">
          {score !== 0 && (
            <>
              Your resume score is {score} {getScoreMessage()}
            </>
          )}
        </h5>
      </div>
    </div>
  );
}

export default Score;
