import React from 'react';
import { motion } from 'framer-motion';
import AnimatedTexts from './AnimatedTexts';

const Main = () => {
    return (
        <>
            <AnimatedTexts />
            <motion.div 
                className="flex flex-col items-center justify-center min-h-96 text-black p-6 lg:p-12 m-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div 
                    className="text-left max-w-3xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                        ApnAInterview Cracker
                    </h1>
                    <p className="text-lg lg:text-xl font-light">
                        Revolutionizing job readiness with AI-driven mock interviews, market insights, and portfolio tools. Our platform empowers users with personalized feedback, industry trends, and ATS-optimized resume templates, ensuring they're prepared for employment. Join us in bridging the gap between education and industry, enhancing your career journey today.
                    </p>
                </motion.div>
            </motion.div>
        </>
    );
}

export default Main;
