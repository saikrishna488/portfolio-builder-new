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

    if (!user.role || !user.college) {
        return <div className="text-center text-gray-500">Please complete your profile.</div>;
    }

    return (
        <div className="w-full mx-auto p-8 bg-gradient-to-b from-green-100 to-green-50">

            {/* Header Section (User Icon + Name) */}
            <div className="bg-gradient-to-r from-green-200 to-green-400 p-6 rounded-lg shadow-lg mb-8">
                <div className="flex items-center">
                    <div className="w-16 h-16 flex justify-center items-center rounded-full bg-green-100 mr-4">
                        <User className="text-green-600 w-12 h-12" /> {/* Adjusted icon size */}
                    </div>
                    <h1 className="text-lg font-semibold text-green-700">{user?.name || "Name"}</h1>
                </div>
            </div>

            {/* Description Section (with Icon and Title) */}
            <div className="bg-gradient-to-r from-green-50 to-green-200 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                    <BookOpen className="text-green-500 w-6 h-6 mr-2" /> Summary
                </h2>
                <p className="text-gray-600 text-sm lg:text-base">
                    {user?.description || "A brief description about the user, showcasing their skills and expertise."}
                </p>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-green-50 to-green-200 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                    <FileText className="text-gray-600 w-6 h-6 mr-2" /> Contact Email
                </h2>
                <p className="text-gray-700">{user?.email || "Email not provided"}</p>
            </div>

            {/* Skills and Certifications Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-yellow-700 mb-4 flex items-center">
                        <Star className="text-yellow-500 w-6 h-6 mr-2" /> Skills
                    </h2>
                    <div className="flex flex-wrap gap-3 mt-3">
                        {user?.skills?.length > 0 ? (
                            user.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-yellow-300 px-4 py-2 rounded-full text-sm font-medium text-yellow-800"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No skills provided</p>
                        )}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <Award className="text-blue-500 w-6 h-6 mr-2" /> Certifications
                    </h2>
                    <ul className="pl-6 mt-3 text-gray-700 space-y-2">
                        {user?.certifications?.length > 0 ? (
                            user.certifications.map((cert, index) => (
                                <li
                                    key={index}
                                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md"
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

            {/* Projects Section */}
            <div className="bg-gradient-to-r from-green-50 to-green-200 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                    <Folder className="text-green-500 w-6 h-6 mr-2" /> Projects
                </h2>
                <ul className="pl-6 mt-3 text-gray-700 space-y-3">
                    {user?.projects?.length > 0 ? (
                        user.projects.map((project, index) => (
                            <li
                                key={index}
                                className="bg-green-100 text-green-700 px-4 py-3 rounded-md"
                            >
                                {project}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No projects available</p>
                    )}
                </ul>
            </div>

            {/* Education and Role Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center">
                        <School className="text-purple-500 w-6 h-6 mr-2" /> Education
                    </h2>
                    <p className="text-gray-700">
                        <span className="font-semibold">{user?.college || "College not provided"}</span> —
                        <span className="text-gray-500">{user?.field || "Field not provided"}</span>
                    </p>
                </div>

                <div className="bg-gradient-to-r from-red-100 to-red-200 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
                        <Briefcase className="text-red-500 w-6 h-6 mr-2" /> Role
                    </h2>
                    <p className="text-gray-700">
                        <span className="font-semibold">{user?.role || "Role not provided"}</span>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Portfolio;
