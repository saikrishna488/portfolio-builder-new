"use client";
import { useContext, useState } from 'react';
import { globalContext } from '../../contextApi/GlobalContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Render from '../../components/Render';

const Page = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser, refresh, setRefresh } = useContext(globalContext);
    const router = useRouter();

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
                        document.cookie = `token=${data.token}`;
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
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            {refresh ? <Render /> : null}
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm'>
                <h2 className='text-2xl font-bold mb-6 text-gray-800 text-center'>Login</h2>
                <form onSubmit={submit}>
                    <div className='mb-4'>
                        <label htmlFor="username" className='block text-gray-700 text-sm font-semibold mb-2'>Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder='Enter your username'
                            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="password" className='block text-gray-700 text-sm font-semibold mb-2'>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Enter your password'
                            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <button
                        type="submit"
                        className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Page;
