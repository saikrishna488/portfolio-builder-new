"use client";
import React, { useContext, useState } from 'react';
import { globalContext } from '../../contextApi/GlobalContext';
import { toast } from 'react-toastify';

const Page = () => {
    const { user } = useContext(globalContext);
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [url, setUrl] = useState('');

    const getResponse = async (e) => {
        e.preventDefault();

        if(!text || !url){
            toast("Please enter URL and message.");
            return;
        }
        if (!user) {
            return null;
        }

        setLoading(true);

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/videoai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    videoUrl: url,
                    text,
                    id: user._id
                }),
            });

            const data = await res.json();

            if (!data.message) {
                toast.error('Error occurred, please contact support.');
                setResponse('');
            } else {
                setResponse(data.response);
            }
        } catch (error) {
            toast.error('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
        
        setText('');
        setUrl('');
    };

    if (!user.username) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <h4 className="text-xl text-gray-800 font-semibold">Please log in to access the AI Video Analysis.</h4>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 pt-20">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full border-t-4 border-blue-500">
                <h4 className="text-3xl font-semibold text-gray-900 text-center mb-6">AI Video Analysis</h4>
                <p className="text-sm text-gray-500 text-center mb-4">Note: Please use YouTube video URLs and enter your message for analysis.</p>
                <form onSubmit={getResponse} className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter YouTube video URL"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter your message"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="w-6 h-6 border-4 border-t-white border-gray-300 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            'Send'
                        )}
                    </button>
                </form>

                <div className="mt-6">
                    <h5 className="text-xl font-semibold mb-4 text-blue-700 text-center">Response</h5>
                    <div className="bg-gray-50 border border-blue-300 shadow-lg p-4 rounded-lg h-72 overflow-y-auto">
                        <p className="text-base text-gray-800 whitespace-pre-line">
                            {response || 'No response yet.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
