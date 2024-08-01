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
            toast("please enter url and text")
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
                    id: user.id
                }),
            });

            const data = await res.json();

            if (!data.message) {
                toast.error('Error occurred, contact support team');
                setResponse('');
            } else {
                setResponse(data.response);
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
        
        setText('');
        setUrl('');
    };

    if(!user.username){
        return (
            <h4>Login to access</h4>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center p-2 lg:mt-4 mt-16 ">
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full border border-gray-200">
                <h4 className="text-3xl font-bold mb-6 text-center text-gray-900">AI Video Analysis</h4>
                <form onSubmit={getResponse} className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter YouTube video URL"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927C11.2 2.68 11.44 2.5 11.735 2.5c.168 0 .334.057.473.161L21.765 10.58c.162.154.263.369.263.586 0 .217-.101.432-.263.586l-9.557 8.927c-.14.104-.306.161-.473.161-.296 0-.536-.18-.685-.427L9.309 15.5H3.5A1.5 1.5 0 012 14V7.5A1.5 1.5 0 013.5 6h5.81L11.05 3.073z" />
                            </svg>
                        </span>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter your message"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17l3 3 3-3m0-6v6m0 0H9m3-3a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Send
                    </button>
                </form>
                <div className="mt-6">
                    <h5 className="text-xl font-semibold mb-4 text-blue-700 text-center">Response</h5>
                    <div className="bg-white border border-blue-300 shadow-lg p-2 rounded-lg h-72 overflow-y-auto">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="w-6 h-6 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
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
