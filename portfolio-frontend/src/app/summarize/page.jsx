"use client";
import React, { useContext, useState } from 'react';
import { globalContext } from '../../contextApi/GlobalContext';
import { toast } from 'react-toastify';

const Page = () => {
    const { user } = useContext(globalContext);
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');

    const getResponse = async (e) => {
        e.preventDefault();

        if (!text) {
            toast.error("Please enter text");
            return null;
        }

        if (!user) {
            return null;
        }

        setLoading(true);

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/summerize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text,
                    id: user._id
                }),
            });

            const data = await res.json();

            console.log(data)

            if (!data.message) {
                toast.error('Error occurred, contact support team');
            } else {
                setResponse(data.response);
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
            setText('');
        }
    };

    if (!user?.username) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h4 className="text-2xl font-bold text-gray-700">Login to access</h4>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl border border-gray-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">AI Text Summarizer</h2>
                <form onSubmit={getResponse} className="space-y-6">
                    <div>
                        <label htmlFor="text" className="block text-gray-700 font-medium mb-2">Input Text</label>
                        <textarea
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter text to summarize..."
                            rows="6"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 resize-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                    >
                        {loading ? 'Processing...' : 'Summarize'}
                    </button>
                </form>
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-blue-500 text-center mb-4">Summary Response</h3>
                    <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 h-60 overflow-y-auto shadow-inner">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <p className="text-gray-800 text-base whitespace-pre-line">
                                {response || 'No response generated yet.'}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
