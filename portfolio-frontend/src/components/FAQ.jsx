"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is ApnAInterview Cracker?",
      answer: "It’s an AI-powered platform to help students prepare for interviews with mock sessions, resume templates, and video analytics.",
    },
    {
      question: "How does the AI mock interview work?",
      answer: "Our AI analyzes responses and body language, offering feedback to improve performance.",
    },
    {
      question: "What other tools are available?",
      answer: "We provide ATS resume templates, portfolio sites, and resources for green and AI skill development.",
    },
    {
      question: "Who can use ApnAInterview Cracker?",
      answer: "It’s ideal for students and job-seekers aiming to enhance interview skills.",
    },
    {
      question: "What’s the role of green skills?",
      answer: "Green skills training equips users for sustainable careers, meeting the demand in eco-conscious industries.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-6">
      <div className="lg:w-[80%] w-full mx-auto bg-white p-4 rounded-lg ">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Frequently Asked Questions
        </h2>
        <div>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 p-2 rounded-md mb-2 bg-gray-50 hover:bg-gray-100 transition-all duration-200"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-sm font-medium text-gray-800">{faq.question}</h3>
                {openIndex === index ? (
                  <FaChevronUp className="text-gray-500 text-sm" />
                ) : (
                  <FaChevronDown className="text-gray-500 text-sm" />
                )}
              </div>
              {openIndex === index && (
                <p className="mt-2 text-sm text-gray-600 bg-gray-100 p-2 rounded-md">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
