"use client";

import React, { useState } from 'react';

const Score = () => {
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to handle file upload and fetch score
  const submit = async (e) => {
    e.preventDefault();
    const file = document.getElementById('file').files[0];
    if (!file) {
      setError("Please upload a file first.");
      return;
    }
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to fetch data from server.');

      const data = await res.json();
      setScore(data.score);
    } catch (err) {
      setError('An error occurred while processing the file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreMessage = () => {
    if(score == 0) return 'Password files & non pdf files are not allowed ';
    if (score <= 65) return 'Average';
    if (score <= 70) return 'Good';
    if (score <= 75) return 'Great';
    return 'Excellent';
  };

  return (
    <div id="score" className="flex items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full">
        <h4 className="text-xl font-semibold text-center text-gray-800 mb-6">
          Upload your resume to check the score
        </h4>

        {/* Note for the user */}
        <div className="bg-blue-50 text-blue-800 text-sm p-3 mb-6 rounded-lg">
          <p>Note: Only PDF and Excel files are accepted for resume scoring.</p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="relative">
            <input
              type="file"
              id="file"
              name="upload"
              accept="application/pdf,application/vnd.ms-excel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:bg-blue-300"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-t-white border-blue-300 rounded-full animate-spin"></div>
              </div>
            ) : (
              'Check Score'
            )}
          </button>
        </form>

        {/* Error message */}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {/* Score message */}
        <div className="mt-6 text-center">
          {score !== 0 && (
            <h5 className="text-xl text-gray-700">
              Your resume score is <strong>{score}</strong> ({getScoreMessage()})
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default Score;
