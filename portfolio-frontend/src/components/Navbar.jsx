"use client"
import React, { useContext, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { globalContext } from '../contextApi/GlobalContext';
import { AiOutlineMenu } from 'react-icons/ai';

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
        document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' });
        setHamVisible(false);
    };

    const portfolioView = () => {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
        setHamVisible(false);
    };

    const resumeScore = () => {
        document.getElementById('score')?.scrollIntoView({ behavior: 'smooth' });
        setHamVisible(false);
    };

    const mockInterview = () => {
        document.getElementById('mock')?.scrollIntoView({ behavior: 'smooth' });
        setHamVisible(false);
    };

    const assessmentView = () => {
        document.getElementById('assess')?.scrollIntoView({ behavior: 'smooth' });
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

    const aiChatBot = ()=>{
        document.getElementById('ai')?.scrollIntoView({ behavior: 'smooth' });
        setHamVisible(false)
    }

    return (
        <nav className='z-20 flex items-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white shadow-md h-16 fixed top-0 w-full m-0'>
            {/* for small screens */}
            <ul className='flex lg:hidden items-center justify-between gap-6 w-full px-2 m-0'>
                <li className='flex items-center'>
                    <img onClick={home} src="logo.png" alt="Logo" height={54} width={54} />
                </li>
                <li onClick={() => setHamVisible(true)} className='flex items-center'>
                    <AiOutlineMenu style={{ cursor: "pointer" }} color='white' size={35} />
                </li>
                <aside className={`absolute top-0 right-0 bg-white shadow-lg p-6 w-64 rounded-lg ${hamVisible ? 'block' : 'hidden'}`}>
                    <ul>
                        {user.username && (
                            <>
                                <li onClick={viewProfile} className='flex items-center hover:cursor-pointer mb-2'>
                                    <img src="user.png" alt="User Icon" className='h-10 w-10 rounded-full border border-gray-300' />
                                    <span className='ml-2 text-blue-500 font-semibold truncate w-full'>{user.name}</span>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className='mt-6 flex flex-col space-y-2'>
                        <button onClick={home} className='text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition duration-200 text-left'>Home</button>
                        {pathname === '/' && (
                            <>
                                <button onClick={resumeView} className='text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition duration-200 text-left'>Resume</button>
                                <button onClick={portfolioView} className='text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition duration-200 text-left'>Portfolio</button>
                                <button onClick={resumeScore} className='text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition duration-200 text-left'>Resume Score</button>
                                <button onClick={mockInterview} className='text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition duration-200 text-left'>Mock Interview</button>
                                <button onClick={assessmentView} className='text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition duration-200 text-left'>Assessments</button>
                                <button onClick={aiChatBot} className='text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition duration-200 text-left'>AI ChatBot</button>
                            </>
                        )}
                        {!user.username ? (
                            <>
                                <button onClick={loginSm} className='text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition duration-200 text-left'>Login</button>
                                <button onClick={registerSm} className='text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition duration-200 text-left'>Sign up</button>
                            </>
                        ) : null}
                        <button onClick={() => setHamVisible(false)} className='text-red-600 hover:bg-gray-100 py-2 px-4 rounded-lg transition duration-200 text-left'>Close Menu</button>
                    </div>
                </aside>
            </ul>
            <ul className='hidden lg:flex items-center justify-start w-3/4 gap-6 px-2 m-0'>
                <li className='flex items-center'>
                    <img src="logo.png" alt="Logo" height={54} width={54} />
                </li>
                <li>
                    <span onClick={home} className='cursor-pointer text-sm font-semibold hover:text-blue-200 transition-colors'>
                        Home
                    </span>
                </li>
                {pathname === '/' && (
                    <>
                        <li>
                            <span onClick={resumeView} className='cursor-pointer text-sm font-semibold hover:text-blue-200 transition-colors'>
                                Resume
                            </span>
                        </li>
                        <li>
                            <span onClick={portfolioView} className='cursor-pointer text-sm font-semibold hover:text-blue-200 transition-colors'>
                                Portfolio
                            </span>
                        </li>
                        <li>
                            <span onClick={resumeScore} className='cursor-pointer text-sm font-semibold hover:text-blue-200 transition-colors'>
                                Resume Score
                            </span>
                        </li>
                        <li>
                            <span onClick={mockInterview} className='cursor-pointer text-sm font-semibold hover:text-blue-200 transition-colors'>
                                Mock Interview
                            </span>
                        </li>
                        <li>
                            <span onClick={assessmentView} className='cursor-pointer text-sm font-semibold hover:text-blue-200 transition-colors'>
                                Assessments
                            </span>
                        </li>
                        <li>
                            <span onClick={aiChatBot} className='cursor-pointer text-sm font-semibold hover:text-blue-200 transition-colors'>
                                AI ChatBot
                            </span>
                        </li>
                    </>
                )}
            </ul>
            <ul className='hidden lg:flex items-center justify-end w-1/4 gap-6 px-2 py-0 m-0'>
                {user.username ? (
                    <li onClick={() => setVisible(true)} className='flex items-center hover:cursor-pointer'>
                        <img src="user.png" alt="User Icon" height={40} width={40} className='invert' />
                        <span className='p-1'>{user.name}</span>
                    </li>
                ) : (
                    <>
                        <li>
                            <button onClick={() => router.push('/login')} className='cursor-pointer text-sm font-semibold hover:text-blue-200 transition-colors' aria-label="Login">
                                Login
                            </button>
                        </li>
                        <li>
                            <button onClick={() => router.push('/register')} className='cursor-pointer text-sm font-semibold hover:text-blue-200 transition-colors' aria-label="Signup">
                                Sign up
                            </button>
                        </li>
                    </>
                )}
            </ul>
            <aside className={`absolute top-5 right-4 z-10 bg-white shadow-lg rounded-lg p-4 flex flex-col space-y-4 ${visible ? 'block' : 'hidden'}`}>
                <ul className="space-y-2 text-gray-700">
                    <li className="font-semibold">Username: {user.username}</li>
                    <li className="font-semibold">Name: {user.name}</li>
                    <li className="text-blue-500">Email: {user.email}</li>
                </ul>
                <div className="flex flex-col space-y-2">
                    <button onClick={userData} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="User Data">User Data</button>
                    <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" aria-label="Logout">Logout</button>
                    <button onClick={closeButton} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300" aria-label="Close Menu">Close Menu</button>
                </div>
            </aside>
        </nav>
    );
};

export default Navbar;
