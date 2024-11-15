"use client";

import { useState, useContext } from "react";
import { globalContext } from "../contextApi/GlobalContext";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const MockInterview = () => {
    const router = useRouter();
    const [role, setRole] = useState("");
    const { setQuestions, user } = useContext(globalContext);

    const handleOnChange = (e) => {
        setRole(e.target.value);
    };

    const fetchOnClick = async () => {
        try {
            if (!user.name) {
                toast.info("Please login to access this feature.");
                return;
            }
            if (role) {
                const res1 = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/mockattempts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: user.email }),
                });

                const data1 = await res1.json();
                if (data1.message !== true || data1.days < 1) {
                    toast.warning("You can only attempt once per day.");
                    return;
                }

                const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/questions?role=" + role, {
                    method: "GET",
                });
                const data = await res.json();

                if (data.message === true) {
                    const qns = data.questions.map((question) => question.question);
                    setQuestions(qns);
                    router.push('/mock');
                }
            } else {
                toast.warning("Please select a role.");
            }
        } catch (err) {
            console.error("Failed to fetch questions:", err);
            toast.error("Failed to fetch questions. Please try again.");
        }
    };

    return (
        <div id="mock" className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 transition-transform transform ">
                <h4 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Mock Interview</h4>
                <p className="text-sm text-gray-500 mb-6 text-center">
                    Select a role and start a mock interview to practice your skills. Note: You can attempt only once per day.
                </p>
                <div className="flex flex-col space-y-4">
                    <select
                        value={role}
                        onChange={handleOnChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                    >
                        <option value="">Select a Role</option>
                        <option value="databaseengineer">Database Engineer</option>
                        <option value="fullstack">Full Stack Developer</option>
                    </select>
                    <button
                        onClick={fetchOnClick}
                        className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Start Mock Interview
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MockInterview;
