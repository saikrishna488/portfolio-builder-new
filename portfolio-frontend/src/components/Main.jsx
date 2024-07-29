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
                <div className="max-w-3xl text-left">
                    {/* <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                        ApnAInterview Cracker
                    </h1> */}
                    <p className="text-lg lg:text-xl font-light mb-4">
                        Revolutionizing job readiness with AI-driven mock interviews, market insights, and portfolio tools. Empower yourself with personalized feedback and industry trends. Enhance your career journey today.
                    </p>
                    <p className="text-lg lg:text-xl font-light mb-4">
                        Tailored tools and resources for all career levels. Analyze responses with our AI and get actionable recommendations.
                    </p>
                    <p className="text-lg lg:text-xl font-light">
                        Stay ahead with market insights and job market demands. Prepare not just for an interview, but for a successful career.
                    </p>
                </div>
            </motion.div>
        </>
    );
}

export default Main;
