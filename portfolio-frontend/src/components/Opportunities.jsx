"use client";
import React from "react";
import { ArrowRight, Users, Laptop, Code, Boxes, UserCheck, FolderKanban } from "lucide-react";

const Opportunities = () => {
  const cardData = [
    {
      title: "Microsoft Student Hub",
      description: "Join Microsoft Student Hub to connect, learn, and build your career with exclusive resources and hands-on experiences.",
      link: "https://learn.microsoft.com/en-us/training/student-hub/become-a-student-ambassador",
      icon: <Users size={40} className="text-gray-800" />,
      bgColor: "bg-blue-200", // Light pastel blue
    },
    {
      title: "Crowdsource Learning Community",
      description: "Join a community that leverages collective knowledge to learn and grow together.",
      link: "https://rsvp.withgoogle.com/events/crowdsource-learning-community/home",
      icon: <Boxes size={40} className="text-gray-800" />,
      bgColor: "bg-red-200", // Light pastel red
    },
    {
      title: "Google Developer Student Club Lead",
      description: "Lead a community of developers and help grow their skills and network.",
      link: "https://developers.google.com/community/gdsc/leads",
      icon: <Laptop size={40} className="text-gray-800" />,
      bgColor: "bg-green-200", // Light pastel green
    },
    {
      title: "Google Summer of Code",
      description: "Participate in a global program focused on introducing students to open source software development.",
      link: "https://summerofcode.withgoogle.com/",
      icon: <Code size={40} className="text-gray-800" />,
      bgColor: "bg-yellow-200", // Light pastel yellow
    },
    {
      title: "Google Student Ambassador",
      description: "Represent Google at your university and help students learn about Google's tools and technologies.",
      link: "https://docs.google.com/document/d/1FGYxtollvsRiIlk4Kn4QoYRsxPy0s-FfDYv5GeHs5Qc/edit",
      icon: <UserCheck size={40} className="text-gray-800" />,
      bgColor: "bg-purple-200", // Light pastel purple
    },
    {
      title: "Code Vipassana",
      description: "A series of instructor-led hands-on sessions aimed at building data to AI application.",
      link: "https://rsvp.withgoogle.com/events/cv",
      icon: <FolderKanban size={40} className="text-gray-800" />,
      bgColor: "bg-teal-200", // Light pastel teal
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Open Source Opportunities</h2>
          <p className="text-base text-gray-600">
            Explore the various opportunities to contribute and learn from the open-source community.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, index) => (
            <a
              key={index}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-white p-6 rounded-2xl shadow-lg no-underline"
            >
              {/* Arrow Icon */}
              <div className="flex justify-end mb-2 text-gray-400">
                <ArrowRight size={24} />
              </div>
              
              {/* Icon Section */}
              <div className={`flex items-center justify-center ${card.bgColor} p-6 rounded-full mb-6`}>
                {card.icon}
              </div>
              
              {/* Card Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{card.title}</h3>
              
              {/* Card Description */}
              <p className="text-sm text-gray-600 text-center">{card.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Opportunities;
