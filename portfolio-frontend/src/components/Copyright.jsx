import React from 'react';

const Footer = () => {
    return (
        <footer className=" text-black py-8">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="mb-6 md:mb-0 flex flex-col space-y-4">
                        <h2 className="text-2xl font-bold mb-2">ApnAInterview Cracker</h2>
                        <p className="">
                            Revolutionizes job readiness with AI-driven mock interviews, market insights, and portfolio tools.
                        </p>
                        <p className="">
                            Empowering users with personalized feedback, industry trends, and ATS-optimized resume templates.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                            <p className=" mb-2">Hyderabad, HY 10012, India</p>
                            <a href="mailto:ApnAInterview@example.com" className=" hover:text-blue-500">
                                ApnAInterview@example.com
                            </a>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                            <a href="https://ApnAInterviewcracker.com" className="hover:text-blue-500">
                                ApnAInterviewcracker.com
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <p className=" text-sm">&copy; 2024 ApnAInterview Cracker. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
