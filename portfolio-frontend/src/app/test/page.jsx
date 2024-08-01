"use client";
import React, { useState, useContext } from 'react';
import { globalContext } from '../../contextApi/GlobalContext';
import { toast } from 'react-toastify';

const Page = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { questions, user } = useContext(globalContext);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOptionChange = (question, selectedAnswer, role) => {
        setSelectedOptions(prevSelectedOptions => {
            const updatedOptions = prevSelectedOptions.filter(option => option.question !== question);
            return [...updatedOptions, { question, answer: selectedAnswer, role }];
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if(selectedOptions.length<1){
            toast("Attempt atleast one question")
            return null
        }
        setLoading(true);

        try {
            const role = selectedOptions[0]?.role || '';
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/evaluate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    responses: selectedOptions,
                    username: user.username,
                    role
                })
            });

            const data = await res.json();

            if (data.message) {
                setResult(data.result);
            } else {
                console.error('Evaluation failed:', data.error);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-xl font-semibold text-gray-700">Loading...</div>
            </div>
        );
    }

    if (result !== "") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-4">
                        Result
                    </div>
                    <div className="text-xl font-semibold text-gray-700">
                        You scored {result} out of {selectedOptions.length}
                    </div>
                </div>
            </div>
        );
    }


    if (!user.username) {
        return (
            <>
                <h4>Access From Homepage</h4>
            </>
        )
    }

    return (
        <div className="p-6 bg-gray-100 flex flex-col items-center min-h-screen">
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Assessment</h2>
                <form onSubmit={onSubmit}>
                    {questions.map((questionItem, index) => (
                        <div key={index} className="mb-6">
                            <p className="font-semibold text-gray-700">
                                {index + 1}. {questionItem.question}
                            </p>
                            <div className="mt-2 space-y-2">
                                {questionItem.options.map((option, optionIndex) => (
                                    <label key={optionIndex} className="block mt-1">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option}
                                            onChange={() => handleOptionChange(questionItem.question, option, questionItem.role)}
                                            className="mr-2 text-blue-600 focus:ring-blue-500"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Page;
