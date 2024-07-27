"use client";
import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { globalContext } from '../../contextApi/GlobalContext';
import { useRouter } from 'next/navigation';
import Render from '../../components/Render';

const page = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [certifications, setCertifications] = useState("");
    const [projects, setProjects] = useState("");
    const [college, setCollege] = useState("");
    const [field, setField] = useState("");
    const [role, setRole] = useState("");
    const { user, data, setData, refresh, setRefresh } = useContext(globalContext);

    const router = useRouter();

    useEffect(() => {
        if (data.name) {
            setName(data.name);
            setDescription(data.description);
            setSkills(data.skills);
            setCertifications(data.certifications);
            setProjects(data.projects);
            setCollege(data.college);
            setField(data.field);
            setRole(data.role);
        }
    }, [data]);

    const submit = (e) => {
        e.preventDefault();
        if (name.length > 1 && description.length > 1 && skills.length > 1 && certifications.length > 1 && projects.length > 1) {
            let obj = {
                name,
                description,
                skills,
                certifications,
                projects,
                college,
                field,
                role,
                id: user.username
            }

            console.log(obj);
            try {
                if (!user.username) {
                    throw new Error("not logged in");
                }
                fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/userdata', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }).then((res) => {
                    return res.json();
                }).then((data) => {
                    if (data.successful === true) {
                        setData(data);
                        toast("Data updated now you can create portfolio/resume");
                        setRefresh(true);
                        router.push('/');
                    } else {
                        toast("Please login to continue");
                        throw new Error("err");
                    }
                })
            } catch (err) {
                toast("Please login to continue");
            }
        } else {
            toast("Please fill all the fields");
        }
    }

    if (user.username) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
                {refresh ? <Render /> : null}
                <form className='bg-white p-8 rounded-lg shadow-md w-full max-w-md' onSubmit={submit}>
                    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Update Profile</h2>
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder='Name (e.g., Harry)' required={true} className='mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500' />
                    <input type="text" name="field" value={field} onChange={e => setField(e.target.value)} placeholder='Field (e.g., Computer Science)' required={true} className='mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500' />
                    <input type="text" name="role" value={role} onChange={e => setRole(e.target.value)} placeholder='Role (e.g., Designing)' required={true} className='mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500' />
                    <input type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} placeholder='Description' required={true} className='mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500' />
                    <input type="text" name="skills" value={skills} onChange={e => setSkills(e.target.value)} placeholder='Skills (e.g., 1,2,3)' required={true} className='mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500' />
                    <input type="text" name="certifications" value={certifications} onChange={e => setCertifications(e.target.value)} placeholder='Certifications (e.g., 1,2,3)' required={true} className='mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500' />
                    <input type="text" name="projects" value={projects} onChange={e => setProjects(e.target.value)} placeholder='Projects (e.g., 1,2,3)' required={true} className='mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500' />
                    <input type="text" name="college" value={college} onChange={e => setCollege(e.target.value)} placeholder='College' required={true} className='mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500' />
                    <button className='bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300'>Submit</button>
                </form>
            </div>
        )
    } else {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
                <h4 className="text-xl font-semibold text-gray-700">Login to access</h4>
            </div>
        )
    }
}

export default page;
