import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">


      {/* Copyright Section */}
      <div className="mt-8 text-center text-gray-500">
        © {new Date().getFullYear()} LMS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;