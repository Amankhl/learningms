'use client'
import { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UploadedCourseCard } from '@/components/UploadedCourseCard';

type Course = {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
  educatorname: string;
  imgUrl?: string;
  status: string;
  createdAt: string;
};

export default function UploadCourse() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  
  useEffect(() => {
    startTransition(() => {
      (async function () {
        try {
          const response = await axios.get('/api/courses');
          // console.log(response)
          setCourses(response.data);
        } catch (error) {
          console.error('Error fetching uploaded courses:', error);
        }
      })();
    });
  }, []);

    return (
      <main className="p-6 min-h-[93%] w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Uploaded Courses</h1>
        <Button onClick={() => router.push('/UploadCourses/CreateCourse')}>
          Create Course
        </Button>
      </div>
      <div className='w-full h-full'>
        {isPending ? (
          <p className="text-center text-gray-400">Loading courses...</p>
        ) : courses.length > 0 ? (
          <ul className="w-full h-full flex-wrap flex gap-5">
            {courses.map(course => (
              <UploadedCourseCard key={course.id} id={course.id} title={course.title} description={course.description} instructor={course.educatorname} status={course?.status} img={course?.imgUrl} createdAt={course?.createdAt}/>
            ))}
          </ul>
        ) : (
        <p className="text-center text-gray-500 mt-10">You haven't uploaded any course.</p>
        )}
      </div>
    </main>
    );
}