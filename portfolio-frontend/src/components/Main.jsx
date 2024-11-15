import React from 'react';
import { motion } from 'framer-motion';
import AnimatedTexts from './AnimatedTexts';
import { useRouter } from 'next/navigation';

const Main = () => {

    const router = useRouter();
    return (
        <>
        <div className='pt-20 min-h-screen relative'>
            <AnimatedTexts />
            <motion.div 
                className="flex flex-col items-center justify-center text-black p-6 lg:p-12 m-0"
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

            {/* Animated Scroll Down Arrow */}
            <motion.div
            onClick={()=>router.push('/#tools')}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
            >
                <svg className="w-8 h-8 text-black animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7 7 7-7"></path>
                </svg>
            </motion.div>
        </div>
        </>
    );
}

export default Main;
