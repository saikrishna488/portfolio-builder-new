"use client";

import React, { useRef, useContext } from 'react';
import html2pdf from 'html2pdf.js';
import { globalContext } from '../../contextApi/GlobalContext';

const Resume = () => {
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
        <div className="container mx-auto p-4 flex flex-col bg-gray-100 min-h-screen items-center justify-center">
            <div className="text-center mt-4">
                <button
                    onClick={downloadResume}
                    className="bg-blue-600 text-white px-6 py-2 rounded shadow-lg hover:bg-blue-700 transition duration-300 ml-4 mb-4"
                >
                    Download Resume
                </button>
            </div>
            <div ref={resumeRef} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <div className="text-center border-b-2 border-gray-300 pb-4 mb-4">
                    <h1 className="text-4xl font-bold text-gray-900">{data.name}</h1>
                    <p className="text-xl text-gray-600">{data.role}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-2">Description</h2>
                    <p className="text-gray-700">{data.description}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-2">Field</h2>
                    <p className="text-gray-700">{data.field}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-2">Role</h2>
                    <p className="text-gray-700">{data.role}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-2">Skills</h2>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                        {skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-2">Certifications</h2>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                        {certifications.map((certificate, index) => (
                            <li key={index}>{certificate}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-2">Projects</h2>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                        {projects.map((project, index) => (
                            <li key={index}>{project}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-2">College</h2>
                    <p className="text-gray-700">{data.college}</p>
                </div>
            </div>
        </div>
    );
};

export default Resume;
