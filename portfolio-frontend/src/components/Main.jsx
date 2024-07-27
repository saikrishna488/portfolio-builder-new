import React from 'react';
import AnimatedTexts from './AnimatedTexts';

const Main = () => {
    return (
        <>
            <AnimatedTexts />
            <div className="flex flex-col items-center justify-center min-h-screen bg-customDarkBlue text-white p-6 lg:p-12">
                <div className="text-center max-w-3xl">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                        ApnAInterview Cracker
                    </h1>
                    <p className="text-lg lg:text-xl font-light">
                        Revolutionizing job readiness with AI-driven mock interviews, market insights, and portfolio tools. Our platform empowers users with personalized feedback, industry trends, and ATS-optimized resume templates, ensuring they're prepared for employment. Join us in bridging the gap between education and industry, enhancing your career journey today.
                    </p>
                </div>
            </div>
        </>

    );
}

export default Main;
