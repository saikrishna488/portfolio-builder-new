"use client";
import React, { useContext, useEffect, useState } from 'react';
import { globalContext } from '../contextApi/GlobalContext';
import { useRouter } from 'next/navigation';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

const Resume = () => {
    const { data, setCurrentResume } = useContext(globalContext);
    const [resume, setResume] = useState([]);
    const router = useRouter();

    const resumeCard = (name) => {
        try {
            if (data.id) {
                setCurrentResume(name);
                router.push('/resume');
            } else {
                toast.error("Please fill your data in the profile section");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error occurred. Please try again.");
        }
    };

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resume`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await res.json();
                setResume(data);
            } catch (err) {
                console.error("Error fetching resumes:", err);
            }
        };

        fetchAll();
    }, []);

    const scrollLeft = () => {
        document.querySelector('.holder-resume').scrollBy({ left: -360, behavior: 'smooth' });
    };

    const scrollRight = () => {
        document.querySelector('.holder-resume').scrollBy({ left: 360, behavior: 'smooth' });
    };

    return (
        <div id='resume' className="flex flex-col items-center min-h-screen bg-customDarkBlue text-white p-6 lg:p-12">
            <h4 className="text-2xl lg:text-3xl font-bold mb-8">Resume (Choose Templates)</h4>
            <div className="relative w-full max-w-6xl">
                {/* Arrow Buttons */}
                <button
                    className="hidden md:flex items-center justify-center absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 transition rounded-full p-2 shadow-lg z-10"
                    onClick={scrollLeft}
                    style={{ left: '10px' }} // Adjust the position to ensure space
                >
                    <BsFillArrowLeftCircleFill size={40} />
                </button>
                <button
                    className="hidden md:flex items-center justify-center absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 transition rounded-full p-2 shadow-lg z-10"
                    onClick={scrollRight}
                    style={{ right: '10px' }} // Adjust the position to ensure space
                >
                    <BsFillArrowRightCircleFill size={40} />
                </button>
                {/* Resume Cards */}
                <div className="flex overflow-x-auto scroll-smooth py-4 space-x-4 holder-resume px-10">
                    {resume.map((item) => (
                        <div
                            className="flex-shrink-0 cursor-pointer bg-gray-900 border border-gray-700 rounded-lg shadow-lg hover:bg-gray-800 transition-transform transform hover:scale-105"
                            onClick={() => resumeCard(item.name)}
                            key={item.name}
                            style={{ minWidth: '280px', maxWidth: '350px' }}
                        >
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.url}`}
                                alt={item.name}
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Resume;
