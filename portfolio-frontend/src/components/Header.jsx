"use client";
import React, { useContext, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { globalContext } from '../contextApi/GlobalContext';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, setUser,setData } = useContext(globalContext);
    const [visible, setVisible] = useState(false);

    const home = () => {
        router.push('/');
    }
    const portfolio = () => {
        document.getElementsByClassName('portfolio')[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const resume = () => {
        document.getElementsByClassName('resume')[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const logout = () => {
        document.cookie = "token='';";
        setUser({});
        setData([])


    }

    const openHam = () => {
        if (visible) {
            document.getElementsByClassName('ham-ul')[0].style.display = 'none';
            setVisible(false);
        }
        else {
            setVisible(true);
            document.getElementsByClassName('ham-ul')[0].style.display = 'block';
        }

    }

    return (
        <>
            <div className='header'>
                <ul className='nav'>
                    <img src="logo.png" alt="loading" />
                    <li className='templates' id='port' onClick={home}>Home</li>

                    {
                        user.name ? (
                            <>
                                <div className='user-box'>
                                    <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="" />
                                    <span style={{color:"white"}}>{user.name}</span>
                                </div>
                                <div className='user-2'>
                                    <span> <b>Name : </b>{user.name}</span>
                                    <span> <b>Username : </b>{user.username}</span>
                                    <span> <b>Email : </b>{user.email}</span>
                                    <button className='button' onClick={() => { router.push('/userdata') }}>User Data</button>
                                    <button className='button' onClick={logout}>Logout</button>
                                </div>
                            </>


                        ) : (<>
                            <li className='button' onClick={() => router.push('/login')}>Login</li>
                            <li className='button' onClick={() => router.push('/register')}>Signup</li>
                        </>)
                    }
                </ul>
            </div>
            <aside className='ham'>

                <div className='logo-box'>
                    <img src="logo.png" className='prof-img' alt="loading" />
                    <h6 style={{ color: "white" }}>ApnAInterview Cracker</h6>
                </div>

                <ul className='ham-ul'>
                    
                    {
                        user.name ? (
                            <>
                                <div className='user-box'>
                                    <img className='prof-img' src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="" />
                                    <span>{user.name}</span>
                                    <a href="">View profile</a>
                                </div>
                                <div className='user-2'>
                                    <span> <b>Name : </b>{user.name}</span>
                                    <span> <b>Username : </b>{user.username}</span>
                                    <span> <b>Email : </b>{user.email}</span>
                                    <button className='button' onClick={() => { router.push('/userdata') }}>User Data</button>
                                    <button className='button' onClick={logout}>Logout</button>
                                </div>
                            </>


                        ) : (<>

                        </>)
                    }
                    <li className='' id='port' onClick={home}>Home</li>
                    <li className='' onClick={resume}>Resume</li>
                    <li className='' id='port' onClick={portfolio}>Portfolio</li>
                    {
                        pathname == '/' && !user.name ? (
                            <>
                                <li className='' onClick={() => router.push('/login')}>Login</li>
                                <li className='' onClick={() => router.push('/register')}>Signup</li>
                            </>
                        ) : (<></>)
                    }
                    <li className='' id='port' onClick={openHam} ><AiOutlineClose size={20} /> Close Menu</li>
                </ul>
                <AiOutlineMenu onClick={openHam} style={{ cursor: "pointer" }} color='white' size={35} />
            </aside>

        </>
    )

}

export default Header;
