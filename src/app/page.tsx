'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import hero from '../public/hero.jpg'
import Courses from '@/components/Courses';
import Link from 'next/link';
import InfiniteLogoSlider from '@/components/LogoSlider';
import { useProfile } from '@/context/ProfileContext';

const HomePage = () => {

  const user = useProfile();
  // console.log(user)

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="text-white py-20 px-8 flex justify-center items-center relative bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.src})`, backgroundPosition: 'center 30%' }}
      >
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-4">Educate and empower students</h1>
          <p className="text-lg mb-6">We craft unmatched learning experience for your students, clients and audience, that drives engagement, retention.</p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary"><Link href='/Register'>Join Now</Link></Button>
            <Button><Link href='/Login'>Login</Link></Button>
          </div>
        </div>
      </section>

      {/* Partners Section */}

      <InfiniteLogoSlider />

      <Courses />
      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Start Learning Today!</h2>
        <Button variant="default">Explore Courses</Button>
      </section>
    </div>
  );
};

export default HomePage;
