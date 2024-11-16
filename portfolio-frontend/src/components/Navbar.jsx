"use client";
import React, { useContext, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { globalContext } from '../contextApi/GlobalContext';
import { House,SquareMousePointer, User, LogOut, File, Briefcase, BookCheck, Bot, X } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
    const router = useRouter();
    const { user, setUser, setData } = useContext(globalContext);
    const [visible, setVisible] = useState(false);
    const [hamVisible, setHamVisible] = useState(false);
    const pathname = usePathname();

    const logout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        setUser({});
        setData([]);
        setVisible(false);
        router.push('/');
    };

    const closeButton = () => {
        setVisible(false);
    };

    const home = () => {
        router.push('/');
        setHamVisible(false);
    };

    const userData = () => {
        router.push('/userdata');
        setVisible(false);
    };

    const resumeView = () => {
        router.push('/resume');
        setHamVisible(false);
    };

    const portfolioView = () => {
        router.push('/portfolio');
        setHamVisible(false);
    };

    const resumeScore = () => {
        router.push('/resumescore');
        setHamVisible(false);
    };

    const mockInterview = () => {
        router.push('/mock/start');
        setHamVisible(false);
    };

    const assessmentView = () => {
        router.push('/test/start');
        setHamVisible(false);
    };

    const viewProfile = () => {
        setVisible(true);
        setHamVisible(false);
    };

    const loginSm = () => {
        router.push('/login');
        setHamVisible(false);
    };

    const registerSm = () => {
        router.push('/register');
        setHamVisible(false);
    };

    const aiChatBot = () => {
        router.push('/ai');
        setHamVisible(false)
    }

    if(pathname.includes('/portfolio/') || (pathname.includes('/resume/'))){
        return null
    }

    return (
        <div className='z-20 fixed top-0 w-full m-0 shadow-md bg-white'>
            <nav className="z-20 flex items-center mx-auto justify-between text-black p-2 top-0 lg:w-[80%]  w-full m-0 rounded-lg">
                <ul className="flex flex-row items-center gap-2 px-2 m-0 w-full">
                    <Image src="/logo.png" alt="Logo" height={40} width={40} className='rounded-full' />
                    <h4 className="text-xl m-0 font-semibold text-gray-700">ApnAInterview Cracker</h4>
                </ul>
                <ul className="flex items-center gap-4 px-2 py-0 m-0">
                    <div className='hidden lg:flex flex-row gap-4'>
                    <li>
                        <span onClick={home} className="cursor-pointer text-md text-gray-600 hover:text-blue-500 transition-colors font-medium flex items-center">
                            <House size={20} className="mr-1" /> Home
                        </span>
                    </li>
                    <li>
                        <span onClick={()=>router.push('/#tools')} className="cursor-pointer text-md text-gray-600 hover:text-blue-500 transition-colors font-medium flex items-center">
                            <SquareMousePointer size={20} className="mr-1" /> Tools
                        </span>
                    </li>
                    </div>
                    {user.username ? (
                        <li onClick={() => setVisible(true)} className="flex items-center p-2 border-2 border-gray-300 rounded-full hover:bg-gray-100 cursor-pointer transition duration-300">
                            <User size={20} className="text-gray-600 hover:text-gray-800" />
                        </li>
                    ) : (
                        <>
                            <li>
                                <button
                                    onClick={() => router.push('/login')}
                                    className="bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors py-2 px-4 rounded-lg text-sm font-medium shadow-md focus:outline-none"
                                    aria-label="Login"
                                >
                                    Login
                                </button>
                            </li>
                        </>
                    )}

                    <aside className={`absolute top-0 right-0 z-10 bg-white shadow-lg rounded-lg p-4 w-72 flex flex-col space-y-4 ${visible ? 'block' : 'hidden'}`}>
                        {/* Close Icon */}
                        <button onClick={closeButton} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <X size={20} aria-label="Close Menu" />
                        </button>

                        {/* User Info */}
                        <div className="flex border-b p-4 items-center gap-2 border-gray-200">
                            <User size={35} className="text-gray-500 border-2 border-gray-400 rounded-full" />
                            <div className="text-gray-700 flex flex-col">
                                <p className="text-lg m-0 font-semibold">{user.name}</p>
                                <p className="text-sm m-0 text-blue-500">{user.email}</p>
                            </div>
                        </div>

                        {/* Menu Buttons */}
                        <div className="flex flex-col space-y-2">
                            <button onClick={userData} className="flex items-center gap-3 bg-blue-100 text-blue-600 py-2 px-4 rounded-lg shadow hover:bg-blue-200 transition">
                                <User /> User Data
                            </button>
                            <button onClick={resumeView} className="flex items-center gap-3 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg shadow hover:bg-gray-200 transition">
                                <File /> Resume
                            </button>
                            <button onClick={portfolioView} className="flex items-center gap-3 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg shadow hover:bg-gray-200 transition">
                                <Briefcase /> Portfolio
                            </button>
                            <button onClick={mockInterview} className="flex items-center gap-3 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg shadow hover:bg-gray-200 transition">
                            <BookCheck /> Mock
                            </button>
                            <button onClick={assessmentView} className="flex items-center gap-3 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg shadow hover:bg-gray-200 transition">
                            <BookCheck /> Assessment 
                            </button>
                            <button onClick={aiChatBot} className="flex items-center gap-3 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg shadow hover:bg-gray-200 transition">
                            <Bot /> AI Chat Bot
                            </button>
                            <button onClick={logout} className="flex items-center gap-3 bg-red-100 text-red-600 py-2 px-4 rounded-lg shadow hover:bg-red-200 transition">
                                <LogOut /> Logout
                            </button>
                        </div>
                    </aside>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
