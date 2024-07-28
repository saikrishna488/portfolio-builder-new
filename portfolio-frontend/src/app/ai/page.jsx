"use client";
import React, { useState, useEffect, useRef, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { globalContext } from '../../contextApi/GlobalContext';

const Page = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const { user } = useContext(globalContext);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const onMessageSend = async (e) => {
        e.preventDefault();

        const newMessages = [...messages, { by: user.username, message: userMessage }];
        setMessages(newMessages);
        setUserMessage('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ai`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                    text: userMessage,
                }),
            });

            const data = await res.json();

            if (data.message) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { by: 'AI', message: data.response },
                ]);
            } else {
                toast.error('Server error');
            }
        } catch (error) {
            toast.error('Network error');
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copied to clipboard!');
        }).catch(() => {
            toast.error('Failed to copy!');
        });
    };

    const isCode = (text) => {
        return /`[\s\S]*?`/.test(text);
    };

    const formatMessage = (message) => {
        if (isCode(message)) {
            const parts = message.split(/(`[\s\S]*?`)/).filter(Boolean);
            return parts.map((part, index) => {
                if (/`[\s\S]*`/.test(part) && part.trim().length > 2) {
                    const cleanPart = part.replace(/`/g, '');
                    return (
                        <div key={index} className="relative bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mb-2">
                            <pre className="whitespace-pre-wrap">{cleanPart}</pre>
                            <button
                                onClick={() => copyToClipboard(cleanPart)}
                                className="absolute right-2 top-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Copy Code
                            </button>
                        </div>
                    );
                }
                return part.trim().length > 0 ? <p key={index} className="mb-2">{part}</p> : null;
            }).filter(Boolean);
        } else {
            const paragraphs = message.split('\n\n');
            return paragraphs.map((para, index) => (
                <div key={index} className="mb-4">
                    {para.split('\n').map((line, i) => {
                        const boldParts = line.split(/(\*\*[\s\S]*?\*\*)/).filter(Boolean);
                        return (
                            <div key={i} className="mb-2">
                                {boldParts.map((boldPart, j) => {
                                    if (/\*\*[\s\S]*\*\*/.test(boldPart)) {
                                        return (
                                            <span key={j} className="font-bold">
                                                {boldPart.replace(/\*\*/g, '')}
                                            </span>
                                        );
                                    }
                                    return <span key={j}>{boldPart}</span>;
                                })}
                            </div>
                        );
                    })}
                </div>
            ));
        }
    };

    if (!user.username) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="p-6 text-center">
                    <p className="text-lg font-semibold">Login to access</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col" style={{ minHeight: 'calc(100vh - 80px)' }}>
                <h4 className="text-xl font-semibold text-center mb-4">Chat with AI</h4>
                <div className="flex-grow overflow-y-auto mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb-2 ${msg.by === user.username ? 'text-right' : 'text-left'}`}>
                            <p className={`font-semibold ${msg.by === user.username ? 'text-blue-600' : 'text-gray-600'}`}>{msg.by}</p>
                            <div className={`${msg.by === user.username ? 'bg-blue-100' : 'bg-gray-200'} inline-block px-4 py-2 rounded-lg`}>
                                {formatMessage(msg.message)}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
            </div>

            <form className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 max-w-lg mx-auto" onSubmit={onMessageSend}>
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Enter text"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Page;
