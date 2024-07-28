"use client";
import React, { useEffect, useState, useContext } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { globalContext } from '../contextApi/GlobalContext';
import { toast } from 'react-toastify';

const Portfolio = () => {
    const { data } = useContext(globalContext);
    const [portfolio, setPortfolio] = useState([]);

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
            } catch (error) {
                console.error("Error fetching portfolio:", error);
            }
        };

        fetchAll();
    }, []);

    const scrollLeft = () => {
        document.querySelector('.holder').scrollBy({ left: -360, behavior: 'smooth' });
    };

    const scrollRight = () => {
        document.querySelector('.holder').scrollBy({ left: 360, behavior: 'smooth' });
    };

    const build = async (item) => {
        try {
            if (data.id) {
                const reqData = { tem: item.name, ...data };
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/portfolio`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reqData)
                });
                const d = await res.json();
                if (d.message === true) {
                    toast.success("Success!");
                    window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${d.url}`, '_blank');
                }
            } else {
                toast.error("Please fill your data in the profile section.");
            }
        } catch (err) {
            console.error("Error building portfolio:", err);
            toast.error("An error occurred.");
        }
    };

    return (
        <div id='portfolio' className="flex flex-col items-center justify-center min-h-screen text-black p-6 lg:p-12">
            <h4 className="text-2xl lg:text-3xl font-bold mb-8">Portfolio Templates</h4>
            <div className="relative w-full max-w-6xl">
                {/* Arrow Buttons */}
                <button
                    className="flex items-center justify-center absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 transition rounded-full p-2 shadow-lg z-10"
                    onClick={scrollLeft}
                >
                    <BsFillArrowLeftCircleFill size={40} />
                </button>
                <button
                    className="flex items-center justify-center absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 transition rounded-full p-2 shadow-lg z-10"
                    onClick={scrollRight}
                >
                    <BsFillArrowRightCircleFill size={40} />
                </button>
                {/* Portfolio Cards */}
                <div className="flex overflow-x-auto scroll-smooth py-4 space-x-4 holder px-10">
                    {portfolio.map((item) => (
                        <div
                            className="flex-shrink-0 cursor-pointer bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-800 transition-shadow transform hover:scale-105 shadow-lg"
                            onClick={() => build(item)}
                            key={item.name}
                            style={{ width: '320px', height: '180px' }}
                        >
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.url}`}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Portfolio;
