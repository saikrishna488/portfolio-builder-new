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
                    id: user.id
                }),
            });

            const data = await res.json();

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

    if(!user.username){
        return (
            <h4>Login to access</h4>
        )
    }

    return (
        <div className="flex items-center justify-center mt-4 p-2">
            <div className="bg-white shadow-2xl rounded-lg p-2 max-w-lg w-full border border-gray-300">
                <h4 className="text-4xl font-extrabold mb-6 text-center text-gray-900">AI Text Summarizer</h4>
                <form onSubmit={getResponse} className="space-y-6">
                    <div className="relative">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="place text to summarize..."
                            rows="6"
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-5 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                    >
                        Summarize
                    </button>
                </form>
                <div className="mt-8">
                    <h5 className="text-2xl font-semibold mb-4 text-blue-600 text-center">Response</h5>
                    <div className="bg-blue-50 border border-blue-300 shadow-inner p-2 rounded-lg h-80 overflow-y-auto">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <p className="text-base text-gray-800 whitespace-pre-line">{response || 'No response yet'}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
