"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Ai = () => {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/ai');
    };

    return (
        <div id='ai' className="flex items-center justify-center min-h-screen  p-4">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl p-6 bg-white rounded-lg shadow-lg border border-gray-200"
            >
                <h1 className="text-3xl font-bold text-center mb-4">Why AI Matters</h1>
                <p className="text-lg mb-6">AI is transforming the world. Discover its power and potential.</p>
                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleButtonClick}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Explore AI Chatbot
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Ai;
