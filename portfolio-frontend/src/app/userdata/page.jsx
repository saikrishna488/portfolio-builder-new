"use client";
import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { globalContext } from '../../contextApi/GlobalContext';
import { useRouter } from 'next/navigation';
import { User, Briefcase, BookOpen, FileText, Star, Award, Folder, School } from 'lucide-react';

const Page = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [certifications, setCertifications] = useState("");
    const [projects, setProjects] = useState("");
    const [college, setCollege] = useState("");
    const [field, setField] = useState("");
    const [role, setRole] = useState("");
    const { user, setUser } = useContext(globalContext);

    const router = useRouter();

    useEffect(() => {
        if (user?.name) {
            setName(user.name);
            setDescription(user.description);
            setSkills(user?.skills?.join(", "));
            setCertifications(user?.certifications?.join(", "));
            setProjects(user?.projects?.join(", "));
            setCollege(user.college);
            setField(user.field);
            setRole(user.role);
        }
    }, [user]);

    const submit = (e) => {
        e.preventDefault();
        if (name && description && skills.length && certifications.length && projects.length) {
            let obj = {
                name,
                description,
                skills : skills.split(",").map(item => item.trim()),
                certifications : certifications.split(",").map(item => item.trim()),
                projects : projects.split(",").map(item => item.trim()),
                college,
                field,
                role,
                userId: user._id
            };
            try {
                if (!user.username) throw new Error("not logged in");

                fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/userdata', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(obj)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.res) {
                            toast.success(data.msg);
                            setUser(data.user);
                            router.push('/');
                        } else throw new Error("err");
                    });
            } catch (err) {
                toast.error("Please login to continue");
            }
        } else toast("Please fill all the fields");
    };

    if (user.username) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen pt-20'>
                <form className='bg-white p-8 rounded-lg shadow-md w-full lg:w-[60%] ' onSubmit={submit} >
                    <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Update Profile</h2>

                    <label className=' text-gray-700 mb-2 flex items-center'>
                        <User className="mr-2" /> Name
                    </label>
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder='Enter your name' required className='mb-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-400' />
                    <p className='text-xs text-gray-500 mb-4'>Your full name as you want it displayed on your profile.</p>
                    
                    <label className=' text-gray-700 mb-2 flex items-center'>
                        <BookOpen className="mr-2" /> Field
                    </label>
                    <input type="text" name="field" value={field} onChange={e => setField(e.target.value)} placeholder='Field (e.g., Computer Science)' required className='mb-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-400' />
                    <p className='text-xs text-gray-500 mb-4'>The academic or professional field you are associated with.</p>
                    
                    <label className=' text-gray-700 mb-2 flex items-center'>
                        <Briefcase className="mr-2" /> Role
                    </label>
                    <input type="text" name="role" value={role} onChange={e => setRole(e.target.value)} placeholder='Role (e.g., Developer)' required className='mb-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-400' />
                    <p className='text-xs text-gray-500 mb-4'>Your current role or position.</p>
                    
                    <label className=' text-gray-700 mb-2 flex items-center'>
                        <FileText className="mr-2" /> Description
                    </label>
                    <input type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} placeholder='Brief description about you' required className='mb-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-400' />
                    <p className='text-xs text-gray-500 mb-4'>A short description or bio to introduce yourself.</p>
                    
                    <label className=' text-gray-700 mb-2 flex items-center'>
                        <Star className="mr-2" /> Skills
                    </label>
                    <input type="text" name="skills" value={skills} onChange={e => setSkills(e.target.value)} placeholder='Skills (e.g., React, Node.js)' required className='mb-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-400' />
                    <p className='text-xs text-gray-500 mb-4'>List your core skills, separated by commas.</p>
                    
                    <label className=' text-gray-700 mb-2 flex items-center'>
                        <Award className="mr-2" /> Certifications
                    </label>
                    <input type="text" name="certifications" value={certifications} onChange={e => setCertifications(e.target.value)} placeholder='Certifications (e.g., AWS Certified)' required className='mb-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-400' />
                    <p className='text-xs text-gray-500 mb-4'>Relevant certifications or professional acknowledgments.</p>
                    
                    <label className=' text-gray-700 mb-2 flex items-center'>
                        <Folder className="mr-2" /> Projects
                    </label>
                    <input type="text" name="projects" value={projects} onChange={e => setProjects(e.target.value)} placeholder='Projects (e.g., Project1, Project2)' required className='mb-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-400' />
                    <p className='text-xs text-gray-500 mb-4'>List your completed projects, separated by commas.</p>
                    
                    <label className=' text-gray-700 mb-2 flex items-center'>
                        <School className="mr-2" /> College
                    </label>
                    <input type="text" name="college" value={college} onChange={e => setCollege(e.target.value)} placeholder='College name' required className='mb-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-400' />
                    <p className='text-xs text-gray-500 mb-4'>The institution where you studied or are studying.</p>
                    
                    <button className='bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300'>Submit</button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
                <h4 className="text-xl font-semibold text-gray-700">Login to access</h4>
            </div>
        );
    }
};

export default Page;
