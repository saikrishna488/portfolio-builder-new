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

        if(!text){
            toast("Please enter text.");
            return null;
        }

        if (!user) {
            return null;
        }

        setLoading(true);

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/vertex', {
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

            if (!data.message) {
                toast.error('Error occurred, contact support team.');
            } else {
                setResponse(data.response);
            }
        } catch (error) {
            toast.error('An unexpected error occurred.');
        } finally {
            setLoading(false);
            setText('');
        }
    };

    if (!user.username) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <h4 className="text-xl text-gray-800 font-semibold">Please log in to access Vertex AI.</h4>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center mx-2 min-h-screen bg-gray-50 pt-16">
            <div className="bg-white rounded-lg p-8 max-w-lg w-full border-t-4 border-blue-400">
                <h4 className="text-3xl font-semibold mb-4 text-center text-gray-800">Vertex AI</h4>
                <p className="text-sm text-gray-500 text-center mb-6">Note: Please enter your query and get AI-powered responses!</p>
                <form onSubmit={getResponse} className="flex flex-col space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-5 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-6 h-6 border-4 border-t-white border-gray-300 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            'Ask'
                        )}
                    </button>
                </form>
                <div className="mt-6">
                    <h5 className="text-lg font-semibold mb-3 text-blue-600 text-center">Response</h5>
                    <div className="bg-gray-50 border border-blue-300 shadow-inner p-4 rounded-md h-48 overflow-y-auto">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="w-6 h-6 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-800 whitespace-pre-line">{response || 'No response yet.'}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
