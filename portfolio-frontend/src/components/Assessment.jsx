"use client";

import { useState, useContext } from "react";
import { globalContext } from "../contextApi/GlobalContext";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const Assessment = () => {
    const router = useRouter();
    const [role, setRole] = useState("");
    const { setQuestions, user } = useContext(globalContext);

    const handleOnChange = (e) => {
        setRole(e.target.value);
    };

    const fetchOnClick = async () => {
        try {
            if (!user.name) {
                toast("Please log in to access this feature.");
                return;
            }

            if (role) {
                const res1 = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/attempts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username: user.username })
                });

                const data1 = await res1.json();

                if (data1.message !== true) {
                    return;
                }

                if (data1.days < 7) {
                    toast("You can only attempt once a week.");
                    return;
                }

                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test?role=${role}&username=${user.username}`, {
                    method: "GET",
                });

                const data = await res.json();

                if (data.message === true) {
                    setQuestions(data.questions);

                    if (data.questions.length < 1) {
                        toast("No questions available for the selected role.");
                        return;
                    }

                    router.push('/test');
                } else {
                    toast("Failed to fetch questions.");
                }
            } else {
                toast("Please select a role.");
            }
        } catch (err) {
            console.error(err);
            toast("An error occurred while fetching the data.");
        }
    };

    return (
        <div id="assess" className="flex flex-col items-center justify-center p-6 min-h-screen">
            <div className="max-w-lg w-full bg-white shadow-xl rounded-lg p-8 border border-gray-200">
                <h4 className="text-3xl font-bold text-gray-900 mb-6 text-center">Assessment</h4>
                <div className="flex flex-col space-y-6">
                    <div>
                        <label htmlFor="role" className="block text-gray-700 font-medium mb-2">Select Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={handleOnChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                        >
                            <option value="">Select a Role</option>
                            <option value="databaseengineer">Database Engineer</option>
                            <option value="fullstack">Full Stack Developer</option>
                        </select>
                    </div>

                    <button
                        className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                        onClick={fetchOnClick}
                    >
                        Start Mock Interview
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Assessment;
