"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { Download } from 'lucide-react'; // Icon for download button

const page = ({ params }) => {
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
                    console.error("User data not found");
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

    const downloadResumeAsPDF = () => {
        const element = document.getElementById('resume');
        const options = {
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, logging: true, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save();
    };

    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
            <button
                onClick={downloadResumeAsPDF}
                className="flex items-center mb-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <Download className="mr-2" />
                Download Resume
            </button>

            <div
                id="resume"
                className="bg-white shadow-xl rounded-lg p-8 border border-gray-200 w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {/* Personal Information */}
                <div className="col-span-1 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                    <p className="text-lg text-gray-600 mb-1">{user.role}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-600">{user.phone}</p>
                </div>

                {/* Professional Summary */}
                <div className="col-span-1 md:col-span-2 mb-6 border-b border-gray-300 pb-4">
                    <h2 className="text-xl font-semibold text-indigo-600">Professional Summary</h2>
                    <p className="text-gray-700 mt-2">{user.description}</p>
                </div>

                {/* Skills Section */}
                <div className="col-span-1 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
                    <ul className="flex flex-wrap gap-2">
                        {user.skills?.map((skill, index) => (
                            <li key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md text-sm font-medium shadow-sm">{skill}</li>
                        ))}
                    </ul>
                </div>

                {/* Certifications Section */}
                <div className="col-span-1 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Certifications</h2>
                    <ul className="space-y-1">
                        {user.certifications?.map((certification, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                                <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                                {certification}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Projects Section */}
                <div className="col-span-1 md:col-span-2 mb-6 border-t border-gray-300 pt-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Projects</h2>
                    <ul className="gap-2 ml-4">
                        {user.projects?.map((project, index) => (
                            <li key={index} className="flex items-center text-gray-700 font-medium">
                                <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                                <span>{project}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Education Section */}
                <div className="col-span-1 mb-6 border-t border-gray-300 pt-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Education</h2>
                    <ul className="ml-4 gap-2">
                        <li className="flex items-center text-gray-700">
                            <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                            <p className='m-0'>
                                <span className="font-semibold m-0">{user.college}</span> – {user.field}
                            </p>
                        </li>
                    </ul>
                </div>

                {/* Current Role Section */}
                <div className="col-span-1 mb-6 border-t border-gray-300 pt-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Current Role</h2>
                    <div className="flex items-center gap-2 ml-8">
                        <span className="inline-block w-2 h-2 bg-teal-600 rounded-full mr-2"></span>
                        <p className="text-gray-700 text-lg font-medium m-0">{user.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
