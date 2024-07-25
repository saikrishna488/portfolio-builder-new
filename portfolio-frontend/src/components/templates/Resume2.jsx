"use client";

import React, { useRef, useContext } from 'react';
import html2pdf from 'html2pdf.js';
import { globalContext } from '../../contextApi/GlobalContext';

const Resume2 = () => {
    const { data } = useContext(globalContext);

    const certifications = data.certifications.split(',');
    const skills = data.skills.split(',');
    const projects = data.projects.split(',');

    const resumeRef = useRef();

    const downloadResume = () => {
        const element = resumeRef.current;
        html2pdf().from(element).save('resume.pdf');
    };

    return (
        <div className="container mx-auto p-4 bg-gray-200 min-h-screen flex flex-col items-center justify-center">
            <div className="text-center mt-4">
                <button
                    onClick={downloadResume}
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-teal-700 transition duration-300 mb-4"
                >
                    Download Resume
                </button>
            </div>
            <div ref={resumeRef} className="bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 p-8 rounded-lg shadow-lg w-full max-w-3xl text-gray-900">
                <div className="text-center pb-4 mb-6 border-b-4 border-teal-500">
                    <h1 className="text-5xl font-extrabold text-white">{data.name}</h1>
                    <p className="text-2xl text-gray-200">{data.role}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-white bg-teal-600 p-2 rounded-lg mb-2">Profile</h2>
                        <p className="bg-white p-4 rounded-lg shadow-md">{data.description}</p>
                    </div>
                    <div className="md:w-1/2 space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white bg-teal-600 p-2 rounded-lg mb-2">Field</h2>
                            <p className="bg-white p-4 rounded-lg shadow-md">{data.field}</p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white bg-teal-600 p-2 rounded-lg mb-2">Role</h2>
                            <p className="bg-white p-4 rounded-lg shadow-md">{data.role}</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-6 mt-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white bg-teal-600 p-2 rounded-lg mb-2">Skills</h2>
                        <ul className="bg-white p-4 rounded-lg shadow-md list-disc list-inside">
                            {skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white bg-teal-600 p-2 rounded-lg mb-2">Certifications</h2>
                        <ul className="bg-white p-4 rounded-lg shadow-md list-disc list-inside">
                            {certifications.map((certificate, index) => (
                                <li key={index}>{certificate}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white bg-teal-600 p-2 rounded-lg mb-2">Projects</h2>
                        <ul className="bg-white p-4 rounded-lg shadow-md list-disc list-inside">
                            {projects.map((project, index) => (
                                <li key={index}>{project}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white bg-teal-600 p-2 rounded-lg mb-2">College</h2>
                        <p className="bg-white p-4 rounded-lg shadow-md">{data.college}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume2;
