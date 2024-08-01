"use client"
// src/components/MockInterview.js
import React, { useState, useContext, useEffect } from 'react';
import { globalContext } from '../../contextApi/GlobalContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const MockInterview = () => {

    const router = useRouter()
    const { user, questions } = useContext(globalContext)
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [remainingTime, setRemainingTime] = useState(30*60)


    useEffect(() => {

        const countdown = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown)
                    submitResult()
                    return 0;
                }
                return prev-1
            })
        }, 1000)
        return ()=> clearInterval(countdown)
    },[])

    useEffect(() => {

        const handleVisibilityChange = () => {
            if (document.hidden) {
                alert("Please do not switch tabs during the interview.")
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [])

    const submitResult = () => {
        const result = questions.map((question, i) => ({
            email: user.email,
            question: question,
            answer: answers[i] || ''
        }));

        const sendResult = async () => {
            let res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/result', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ result })
            })

            let data = await res.json()

            if (data.message == true) {
                toast("You will receive your result soon via mail")
                router.push('/')
            }
            else {
                toast("Error occured")
                router.push('/')
            }
        }
        sendResult()
    }


    const handleNextQuestion = () => {
        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        }
        else {
            submitResult()
        }
    };

    const handleAnswerChange = (e) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = e.target.value;
        setAnswers(newAnswers);
    };

    const formatTime = (secs)=>{
        let min = Math.floor(secs / 60)
        let sec = secs % 60

        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    return (
        <>
            {user.username ? (
                <div className="max-w-xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold">Mock Interview</h2>
                        <p className="text-gray-600">Question {questionIndex + 1} of {questions.length}</p>
                        <p className="text-red-500 font-semibold">Time Remaining: {formatTime(remainingTime)}</p>
                    </div>
                    <p className="text-lg mb-3">{questions[questionIndex]}</p>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg mb-5"
                        value={answers[questionIndex] || ''}
                        onChange={handleAnswerChange}
                    />
                    <button
                        className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                        onClick={handleNextQuestion}
                    >
                        {questionIndex < questions.length - 1 ? 'Next' : 'Finish'}
                    </button>
                </div>
            ) : (
                <h1 style={{ textAlign: 'center', color: "white" }}>Login to access</h1>
            )}

        </>

    );
};

export default MockInterview