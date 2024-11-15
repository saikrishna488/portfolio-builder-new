"use client";
import React, { useEffect, useState, useContext } from 'react';
import { globalContext } from '../contextApi/GlobalContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Portfolio = () => {
    const { user } = useContext(globalContext);
    const router = useRouter();

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/portfolio`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();
                setPortfolio(data);

                console.log(data)
            } catch (error) {
                console.log("Error fetching portfolio:", error);
            }
        };

        // fetchAll();

    }, []);

    const build = async (item) => {
        if (!user?.role) {
            toast.error("Please fill the user data in profile section.");
            return null;
        }

        if (!user?.name) {
            toast.error("Please Login to try");
            return null;
        }

        router.push('/portfolio/' + item + '/' + user.username);
    };

    return (
        <div id='portfolio' className="flex flex-col lg:w-[90%] w-full mx-auto items-center min-h-screen text-black p-2 ">
            <h4 className="text-lg font-semibold text-gray-700  pt-20">Choose Portfolio Themes</h4>
            <div className="w-full mx-auto flex lg:justify-start justify-center flex-wrap gap-4">
                {/* Portfolio Cards */}
                <div
                    className="flex-shrink-0 cursor-pointer bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-50 transition transform hover:scale-105"
                    onClick={() => build("mars")}
                    style={{ width: '320px', height: '180px' }}
                >
                    <img
                        src='/templates/Mars.gif'
                        alt={"mars"}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="p-1 text-center text-sm text-gray-600">
                        Mars Theme
                    </div>
                </div>

                <div
                    className="flex-shrink-0 cursor-pointer bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-50 transition transform hover:scale-105 "
                    onClick={() => build("earth")}
                    style={{ width: '320px', height: '180px' }}
                >
                    <img
                        src='/templates/earth.gif'
                        alt={"mars"}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="p-1 text-center text-sm text-gray-600">
                        Earth Theme
                    </div>
                </div>

                {/* Add more Portfolio Cards here */}
            </div>
        </div>
    );
}

export default Portfolio;
