import React from 'react';
import { CourseCard } from '@/components/CourseCard';

const courses = [
  {
    title: 'Mastering Git and GitHub',
    description: 'Learn the essential Git commands and master version control.',
    instructor: 'John Doe',
    status: 'Enrolled',
    img: 'https://camo.githubusercontent.com/2012091c2e44bc55b878907c34f43e698a11f4e085630742f364d00885124f3b/68747470733a2f2f7777772e66726565636f646563616d702e6f72672f6e6577732f636f6e74656e742f696d616765732f323032322f30372f6769742d6769746875622e706e67'
  },
  {
    title: 'JavaScript for Beginners',
    description: 'Start your journey with JavaScript programming.',
    instructor: 'Jane Smith',
    status: 'Not Enrolled',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIK8uoM7XCJ-Od4EQvRQhhwLkXvNy9ZTKQnA&s'
  },
  {
    title: 'React and Next.js Masterclass',
    description: 'Build powerful web apps using React and Next.js.',
    instructor: 'Michael Lee',
    status: 'Enrolled',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXqZRg7aJcCVNeA-YoHlNZeVdTSH7mP5fFwQ&s'
  }
];


const Courses = () => {
  return (
    <div className="w-full bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Explore Our Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
