"use client";
import React, { useState, useContext } from 'react';
import { globalContext } from '../../../contextApi/GlobalContext';
import { toast } from 'react-toastify';

const Page = () => {
    const { adminKey } = useContext(globalContext);
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [answer, setAnswer] = useState('');
    const [role, setRole] = useState('');
    const [testQuestions, setTestQuestions] = useState([]);
    const [username, setUsername] = useState('');
    const [results, setResults] = useState([]);

    const addQuestion = async (e) => {
        e.preventDefault();

        try {
            const obj = {
                role,
                question,
                options: [option1, option2, option3, option4],
                answer
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            const data = await res.json();

            if (data.message) {
                toast.success("Question Added Successfully");
                setQuestion('');
                setOption1('');
                setOption2('');
                setOption3('');
                setOption4('');
                setAnswer('');
            } else {
                toast.error("Failed to add question");
            }
        } catch (err) {
            console.log(err);
            toast.error("An error occurred while adding the question");
        }
    };

    const fetchTestQuestions = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/testquestions?role=${role}&adminKey=${adminKey}`, {
                method: 'GET'
            });

            const data = await res.json();

            if (data.message) {
                setTestQuestions(data.questions || []); // Ensure it's always an array
            } else {
                toast.error("Failed to fetch questions");
            }
        } catch (err) {
            console.log(err);
            toast.error("An error occurred while fetching questions");
        }
    };

    const deleteQuestion = async (question) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    adminKey,
                    question
                })
            });

            const data = await res.json();

            if (data.message) {
                toast.success("Question Deleted Successfully");
                setTestQuestions(prev => prev.filter(q => q.question !== question));
            } else {
                toast.error("Question Not Found");
            }
        } catch (err) {
            console.log(err);
            toast.error("An error occurred while deleting the question");
        }
    };

    const fetchResults = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });

            const data = await res.json();

            if (data.message) {
                setResults(data.results);
                console.log(data.results)
            } else {
                toast.error("No attempts made");
            }
        } catch (err) {
            console.log(err);
            toast.error("Error occurred");
        }
    };

    if (!adminKey) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
                <h4 className="text-xl font-semibold text-gray-700">Login to access</h4>
            </div>
        );
    }

    return (
        <div className="p-6  flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add a Question</h2>
                <form onSubmit={addQuestion} className="space-y-6">
                    <div>
                        <label htmlFor="role" className="block text-gray-700 font-semibold mb-1">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a Role</option>
                            <option value="databaseengineer">Database Engineer</option>
                            <option value="fullstack">Full Stack Developer</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="question" className="block text-gray-700 font-semibold mb-1">Question</label>
                        <input
                            id="question"
                            type="text"
                            placeholder="Enter the question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {['option1', 'option2', 'option3', 'option4'].map((opt, index) => (
                            <div key={opt}>
                                <label htmlFor={opt} className="block text-gray-700 font-semibold mb-1">Option {index + 1}</label>
                                <input
                                    id={opt}
                                    type="text"
                                    placeholder={`Enter option ${index + 1}`}
                                    value={eval(opt)}
                                    onChange={(e) => eval(`setOption${index + 1}`)(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                    </div>

                    <div>
                        <label htmlFor="answer" className="block text-gray-700 font-semibold mb-1">Answer</label>
                        <input
                            id="answer"
                            type="text"
                            placeholder="Enter the correct answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
                        >
                            Add Question
                        </button>
                    </div>
                </form>
            </div>

            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Manage Questions</h2>

                <div className="mb-6">
                    <label htmlFor="role-select" className="block text-gray-700 font-semibold mb-1">Select Role to Fetch Questions</label>
                    <select
                        id="role-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a Role</option>
                        <option value="databaseengineer">Database Engineer</option>
                        <option value="fullstack">Full Stack Developer</option>
                    </select>
                </div>

                <div className="flex justify-center mb-6">
                    <button
                        onClick={fetchTestQuestions}
                        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-300"
                    >
                        Fetch Questions
                    </button>
                </div>

                {testQuestions.length > 0 ? (
                    <div className="space-y-4">
                        {testQuestions.map((questionItem, index) => (
                            <div key={index} className="p-6 bg-gray-50 rounded-lg shadow">
                                <p className="text-gray-800 mb-2">{index + 1}. {questionItem.question}</p>
                                <button
                                    onClick={() => deleteQuestion(questionItem.question)}
                                    className="mt-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300"
                                >
                                    Delete Question
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700 text-center">No questions available</p>
                )}
            </div>

            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Fetch Results</h2>
                <form onSubmit={fetchResults} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition duration-300"
                        >
                            Fetch Results
                        </button>
                    </div>
                </form>

                {results.length > 0 && (
                    <div className="mt-8 space-y-4">
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105"
                            >
                                <div className="flex flex-col">
                                    <p className="text-gray-800 text-lg font-semibold mb-2">
                                        Username: <span className="font-normal">{result.username}</span>
                                    </p>
                                    <p className="text-gray-800 text-lg font-semibold mb-2">
                                        Score: <span className="font-normal">{result.result}/30</span>
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        Attempted on: <span className="font-medium">{result.createdAt.substring(0, 10)}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Page;
