"use client";
import React, { useContext, useState } from 'react';
import { globalContext } from '../../contextApi/GlobalContext';
import { toast } from 'react-toastify';
import { totalmem } from 'os';

const Page = () => {
    const { user } = useContext(globalContext);
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');

    const getResponse = async (e) => {
        e.preventDefault();

        if(!text){
            toast("please enter text")
            return null
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
        <div className="flex flex-col items-center justify-center lg:m-0 p-2 lg:p-2">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full border border-gray-200">
                <h4 className="text-2xl font-semibold mb-4 text-center text-gray-800">Vertex AI</h4>
                <form onSubmit={getResponse} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Ask
                    </button>
                </form>
                <div className="mt-6">
                    <h5 className="text-lg font-semibold mb-2 text-blue-600 text-center">Response</h5>
                    <div className="bg-white border border-blue-300 shadow-inner p-2 rounded-md h-60 overflow-y-auto">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="w-6 h-6 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-800 whitespace-pre-line">{response || 'No response yet'}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
