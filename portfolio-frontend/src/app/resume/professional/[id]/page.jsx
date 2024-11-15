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
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
            <button
                onClick={downloadResumeAsPDF}
                className="flex items-center mb-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <Download className="mr-2" />
                Download Resume
            </button>

            <div
                id="resume"
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-4xl"
            >
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                        <p className="text-lg text-gray-600">{user.role}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-600">{user.phone}</p>
                    </div>
                </div>

                {/* Professional Summary */}
                <div className="mb-6 p-4 bg-gray-100 border-l-4 border-blue-600 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-blue-600">Professional Summary</h2>
                    <p className="text-gray-700">{user.description}</p>
                </div>

                {/* Skills Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b border-gray-200">Skills</h2>

                    {/* Skills displayed as tags */}
                    <ul className="flex flex-wrap gap-4 text-gray-600">
                        {user.skills?.map((skill, index) => (
                            <li key={index} className="bg-gray-200 px-4 py-2 rounded-full shadow-sm text-sm text-gray-800">
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Certifications Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b border-gray-200">Certifications</h2>

                    {/* Certifications List */}
                    <div className="ml-8">
                        {user.certifications?.map((certification, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div> {/* Bullet styled as dot */}
                                <p className="text-gray-700 text-lg m-0 font-medium">{certification}</p>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Projects Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>
                    <div className="ml-8">
                        {user.projects?.map((project, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-1"></div> {/* Project dot */}
                                <p className="text-gray-700 text-lg m-0 font-medium">{project}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <p className="text-gray-700 font-medium m-0">{user.college}</p>
                            <span className="mx-2 text-gray-500">|</span>
                            <p className="text-gray-600 m-0">{user.field}</p>
                        </div>
                    </div>
                </div>



                {/* Current Role Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Role</h2>
                    <div className="flex items-center gap-2 ml-8">
                        <div className="w-2 h-2 bg-teal-600 rounded-full mt-1"></div> {/* Role dot */}
                        <p className="text-gray-700 text-lg m-0 font-medium">{user.role}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default page;
