import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8">

        {/* About Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">About Us</h3>
          <p className="text-gray-400">We provide a seamless learning experience to students, professionals, and lifelong learners. Join us and explore top courses from leading universities and companies.</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/courses" className="text-gray-400 hover:text-white">Courses</Link></li>
            <li><Link href="/certifications" className="text-gray-400 hover:text-white">Certifications</Link></li>
            <li><Link href="/guides" className="text-gray-400 hover:text-white">Guides</Link></li>
            <li><Link href="/quiz" className="text-gray-400 hover:text-white">Quiz</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedinIn size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={24} /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-gray-500">
        © {new Date().getFullYear()} LMS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;