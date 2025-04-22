'use client';

import { useEffect, useState } from 'react';
import { CourseCard } from '@/components/CourseCard';
import axios from 'axios';


type Course = {
  id: number;
  title: string;
  description: string;
  educatorname: string;
  status: string;
  imgUrl: string;
};


const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/home/courses');
        setCourses(res.data);
        // console.log(res.data)
      } catch (err) {
        console.error('Failed to load courses:', err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="w-full bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Explore Our Courses</h1>
      <div className="w-full flex-wrap h-full flex gap-8">
        {courses?.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
