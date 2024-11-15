"use client";
import { useContext, useState } from 'react';
import { globalContext } from '../../contextApi/GlobalContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Render from '../../components/Render';
import { User, Lock, Eye, EyeOff } from 'lucide-react'; // Import lucide icons

const Page = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
    const { user, setUser, refresh, setRefresh } = useContext(globalContext);
    const router = useRouter();

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    const submit = async (e) => {
        e.preventDefault();
        if (username.length > 5) {
            if (password.length > 5) {
                let obj = {
                    username: username,
                    password: password
                };
                try {
                    let res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/login', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(obj)
                    });
                    let data = await res.json();
                    if (data.login === true) {
                        setUser(data);
                        setCookie('token', data.token, 45);
                        toast.success("Login successful");
                        setRefresh(true);
                        router.push('/');
                    } else {
                        toast.error("Login failed");
                    }
                } catch (err) {
                    toast.error("An error occurred");
                }
            } else {
                toast.error("Password should be at least 6 characters long");
            }
        } else {
            toast.error("Username should be at least 6 characters long");
        }
    }

    return (
        <div className='flex items-center justify-center h-full pt-20'>
            {refresh ? <Render /> : null}
            <div className='bg-white p-8 rounded-lg h-full shadow-lg w-full max-w-sm'>
                <h2 className='text-2xl font-bold mb-6 text-gray-800 text-center'>Login</h2>
                <form onSubmit={submit}>
                    <div className='mb-4'>
                        <label htmlFor="username" className='block text-gray-700 text-sm font-semibold mb-2'>Username</label>
                        <div className='flex items-center border-2 rounded-lg  hover:border-blue-600'>
                            <User className='ml-3 text-gray-400' size={20} />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder='Enter your username'
                                className='w-full p-3 pl-10 border-0 rounded-lg focus:outline-none '
                            />
                        </div>
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="password" className='block text-gray-700 text-sm font-semibold mb-2'>Password</label>
                        <div className='flex items-center border-2 hover:border-blue-600 rounded-lg'>
                            <Lock className='ml-3 text-gray-400' size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Enter your password'
                                className='w-full p-3 pl-10 outline-none rounded-lg '
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className='mr-3'
                            >
                                {showPassword ? <EyeOff size={20} className='text-gray-400' /> : <Eye size={20} className='text-gray-400' />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">New User? <span 
                        onClick={() => router.push('/register')} 
                        className="text-blue-500 cursor-pointer hover:text-blue-600">
                        Register
                    </span></p>
                </div>
            </div>
        </div>
    )
}

export default Page;
