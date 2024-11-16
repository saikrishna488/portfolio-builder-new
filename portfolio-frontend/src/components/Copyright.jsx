"use client";
import React from 'react';
import { Mail, MessageCircle, Share, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-12'>
      <div className='w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {/* Newsletter Section */}
        <div className='space-y-4'>
          <h3 className='text-2xl font-bold'>Newsletter</h3>
          <p className='text-gray-400'>Stay updated with our latest news and offers. Subscribe to our newsletter.</p>
          <div className='flex'>
            <input
              type='email'
              placeholder='Enter your email'
              className='flex-grow p-2 rounded-l-lg text-gray-800 focus:outline-none'
            />
            <button className='p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600'>
              <Share />
            </button>
          </div>
        </div>

        {/* Contact Section */}
        <div className='space-y-4'>
          <h3 className='text-2xl font-bold'>Contact Us</h3>
          <ul className='space-y-2'>
            <li className='flex items-center space-x-2'>
              <Mail className='text-blue-400' />
              <span>apnaai@support.com</span>
            </li>
            <li className='flex items-center space-x-2 cursor-pointer'>
              <MessageCircle className='text-red-400' />
              <span>Chat Support</span>
            </li>
            <li className='flex items-center space-x-2 cursor-pointer'>
              <Phone className='text-green-400' />
              <span>Call Us: +918106629402</span>
            </li>
          </ul>
        </div>

        {/* Copyright Section */}
        <div className='col-span-1 md:col-span-2 lg:col-span-1 text-center md:text-left'>
          <p className='text-gray-400'>
            © {new Date().getFullYear()} ApnAInterview cracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
