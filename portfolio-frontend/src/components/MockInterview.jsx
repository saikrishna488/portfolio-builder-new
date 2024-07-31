"use client";

import { useState, useContext } from "react";
import { globalContext } from "../contextApi/GlobalContext";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const MockInterview = () => {
    const router = useRouter()
    const [role, setRole] = useState("");
    const { setQuestions, user } = useContext(globalContext)

    const handleOnChange = (e) => {
        setRole(e.target.value);
    };

    const fetchOnClick = async () => {
        try {
            if (!user.name) {
                toast("Login to access")
            }
            else {
                if (role) {
                    const res1 = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/mockattempts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email: user.email })
                    });
    
                    const data1 = await res1.json();
    
                    if (data1.message !== true) {
                        return;
                    }
                    console.log(data1)
    
                    if (data1.days < 7) {
                        toast("You can only attempt once a week.");
                        return;
                    }


                    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/questions?role=" + role, {
                        method: "GET",
                    })
                    const data = await res.json();

                    if (data.message == true) {

                        let qns = []

                        data.questions.map((question) => {
                            qns.push(question.question)
                        })

                        setQuestions(qns)
                        router.push('/mock')
                    }
                }
            }

        }
        catch (err) {
            console.log("questions fetch failed")
        }

    }

    return (
        <div id="mock" className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Mock Interview</h4>
                <div className="flex flex-col space-y-4">
                    <select
                        value={role}
                        onChange={handleOnChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a Role</option>
                        <option value="databaseengineer">Database engineer</option>
                        <option value="fullstack">Full stack developer</option>
                    </select>

                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={fetchOnClick}>
                        Start Mock Interview
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MockInterview;
