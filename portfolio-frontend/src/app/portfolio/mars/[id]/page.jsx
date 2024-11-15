"use client";
import React, { useState, useEffect } from 'react';
import { User, Briefcase, BookOpen, FileText, Star, Award, Folder, School } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Portfolio = ({ params }) => {
    const id = params.id;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/userdata/${id}`);
                if (res.data.res) {
                    setUser(res.data.user);
                } else {
                    setError("User data not found");
                    toast.error(res.data.msg);
                }
            } catch (error) {
                setError("Error fetching user data");
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchUserData();
    }, [id]);

    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-gray-500">{error}</div>;
    }

    if(!user.role || !user.college){
        return <div className="text-center text-gray-500">Fill the user data in profile section.</div>;
    }

    return (
        <div className="w-full mx-auto p-8 space-y-8 bg-gradient-to-r from-[#F0E1C6] to-[#F5E2B1]">

            {/* Name and Icon at the Top */}
            <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-[#F1E1C6] to-[#F7D9B7] rounded-lg shadow-md">
                <User className="text-[#D8B38C] w-12 h-12" />
                <div>
                    <h1 className="text-xl font-semibold text-[#6C4F37]">{user?.name || "Name"}</h1>
                </div>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-r from-[#F9E2B2] to-[#F6E0A1] rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold flex items-center text-[#6C4F37] mb-3">
                    <BookOpen className="text-[#F0A63F] w-6 h-6 mr-2" /> Summary
                </h2>
                <p className="text-gray-700 mt-2">{user?.description || "A brief description about the user."}</p>
            </div>

            {/* Email Card */}
            <div className="bg-gradient-to-r from-[#F1D0A1] to-[#F5E0B7] rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold flex items-center text-[#6C4F37] mb-3">
                    <FileText className="text-[#F19C44] w-6 h-6 mr-2" /> Email
                </h2>
                <p className="text-gray-700 mt-2">{user?.email || "Email not provided"}</p>
            </div>

            {/* Row of Cards for Skills and Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Card for Skills */}
                <div className="bg-gradient-to-r from-[#F5D48A] to-[#F1D39A] rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold flex items-center text-[#6C4F37] mb-3">
                        <Star className="text-[#F0A63F] w-6 h-6 mr-2" /> Skills
                    </h2>
                    <div className="flex flex-wrap gap-3 mt-3">
                        {user?.skills?.length > 0 ? (
                            user.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-[#F1D8A3] text-[#6C4F37] px-4 py-2 rounded-full text-sm font-medium"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No skills provided</p>
                        )}
                    </div>
                </div>

                {/* Card for Certifications */}
                <div className="bg-gradient-to-r from-[#F5C68F] to-[#F1B77F] rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold flex items-center text-[#6C4F37] mb-3">
                        <Award className="text-[#F19C44] w-6 h-6 mr-2" /> Certifications
                    </h2>
                    <ul className="pl-6 mt-3 text-gray-700 space-y-2">
                        {user?.certifications?.length > 0 ? (
                            user.certifications.map((cert, index) => (
                                <li
                                    key={index}
                                    className="bg-[#F1D8A3] text-[#6C4F37] px-4 py-2 rounded-md"
                                >
                                    {cert}
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No certifications available</p>
                        )}
                    </ul>
                </div>
            </div>

            {/* Card for Projects */}
            <div className="bg-gradient-to-r from-[#F6D381] to-[#F3C774] rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold flex items-center text-[#6C4F37] mb-3">
                    <Folder className="text-[#FF8C42] w-6 h-6 mr-2" /> Projects
                </h2>
                <ul className="pl-6 mt-3 text-gray-700 space-y-3">
                    {user?.projects?.length > 0 ? (
                        user.projects.map((project, index) => (
                            <li
                                key={index}
                                className="bg-[#F1D8A3] text-[#6C4F37] px-4 py-3 rounded-md"
                            >
                                {project}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No projects available</p>
                    )}
                </ul>
            </div>

            {/* Card for Education */}
            <div className="bg-gradient-to-r from-[#F9E0A1] to-[#F7D09A] rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold flex items-center text-[#6C4F37] mb-3">
                    <School className="text-[#F1A352] w-6 h-6 mr-2" /> Education
                </h2>
                <p className="mt-2 text-gray-700">
                    <span className="font-semibold">{user?.college || "College not provided"}</span> —
                    <span className="text-gray-500">{user?.field || "Field not provided"}</span>
                </p>
            </div>

        </div>
    );
};

export default Portfolio;
