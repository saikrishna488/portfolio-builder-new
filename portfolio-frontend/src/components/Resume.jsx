"use client";
import React, { useContext, useEffect, useState } from 'react';
import { globalContext } from '../contextApi/GlobalContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Resume = () => {
    const { user } = useContext(globalContext);
    const router = useRouter();

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

        // fetchAll();
    }, []);

    const resumeCard = (item) => {
        if(!user?.name){
            toast.error("Please Login to try");
            return null;
        }

        if(!user.role){
            toast.error("Please fill the user data in profile section.");
            return null;
        }

        router.push('/resume/' + item + '/' + user.username);
    };

    return (
        <div id='resume' className="flex flex-col items-center min-h-screen text-black pt-20">
            <h4 className="text-xl font-bold mb-10">Choose Resume Templates</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                {/* Resume Card */}
                <div
                    className="cursor-pointer bg-white border border-gray-300 rounded-lg shadow-md  transform  transition duration-300 flex flex-col items-center "
                    onClick={() => resumeCard("elevate")}
                >
                    <div className="w-full h-48 bg-gray-100 rounded-md ">
                        <img
                            src={'./resumes/elevate.png'} // Add resume thumbnail URL here if available
                            alt={'resume'}
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                </div>

                <div
                    className="cursor-pointer bg-white border border-gray-300 rounded-lg shadow-md  transform  transition duration-300 flex flex-col items-center "
                    onClick={() => resumeCard("professional")}
                >
                    <div className="w-full h-48 bg-gray-100 rounded-md ">
                        <img
                            src={'./resumes/professional.png'} // Add resume thumbnail URL here if available
                            alt={'resume'}
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                </div>


                {/* Add more resume cards as needed */}
            </div>
        </div>
    );
};

export default Resume;
