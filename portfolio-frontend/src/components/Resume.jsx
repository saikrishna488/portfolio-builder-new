"use client";
import React, { useContext, useEffect, useState } from 'react';
import { globalContext } from '../contextApi/GlobalContext';
import { useRouter } from 'next/navigation'; // Updated import for Next.js 12+
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

const Resume = () => {
    const { data,setCurrentResume } = useContext(globalContext);
    const [resume,setResume] = useState([])
    const router = useRouter();

    const resumeCard = (name) => {
        try {
            if (data.id) {
                setCurrentResume(name)
                router.push('/resume');
            } else {
                console.log("err occurred", data);
                toast("Please fill your data in profile section");
            }
        } catch (err) {
            console.log(err);
            toast("Login to continue");
        }
    };

    useEffect(()=>{

        const fetchAll = () => {
            fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/resume', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                return res.json();
            }).then((data) => {
                setResume(data)
                console.log(data)
            });
        }

        fetchAll()

    },[])
    const leftArrow = () => {
        console.log("clicked")
        let left = document.getElementsByClassName('holder-resume')[0];
        left.scrollBy(-360, 0);
    }
    const rightArrow = () => {
        console.log("clicked");
        let right = document.getElementsByClassName('holder-resume')[0];
        right.scrollBy(360, 0);
    }

    return (
        <div className='resume'>
            <h4 style={{ color: 'white' }}>Resume (choose templates)</h4>
            <span className='left-arrow' onClick={leftArrow}><BsFillArrowLeftCircleFill size={40} /></span>
            <span className='right-arrow' onClick={rightArrow}><BsFillArrowRightCircleFill size={40} /></span>
            <div className='holder-resume'>

                {resume.map((resume)=>(
                    <div className="resume-card" onClick={()=>resumeCard(resume.name)}>
                    <img src={process.env.NEXT_PUBLIC_BACKEND_URL+"/" + resume.url} alt="" />
                </div>
                ))}
                
            </div>
        </div>
    );
};

export default Resume;
