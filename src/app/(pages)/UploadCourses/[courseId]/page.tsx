'use client'
import React, { useEffect, useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';



const CourseEditor = () => {
  const params = useParams();
  const courseId = params?.courseId;
  const router = useRouter()

  const [course, setCourse] = useState<{
    id: number;
    title: string;
    description: string;
    videoUrl?: string;
    imgUrl?: string;
    status: string;
    chapters: { id: number; title: string; status: string }[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  useEffect(() => {
    if (!courseId) return;
    (async () => {
      try {
        const res = await axios.get(`/api/courses/${courseId}`);
        setCourse(res.data);
        setIsLoading(false);
        // console.log(res.data)
      } catch (error) {
        console.error('Failed to load course:', error);
      }
    })();
  }, [courseId]);


  const handleUpdateCourse = async () => {
    try {
      await axios.put(`/api/courses/${courseId}`, {
        title: course?.title,
        description: course?.description,
        videoUrl: course?.videoUrl,
        imgUrl: course?.imgUrl,
        status: course?.status,
      });
      alert('Course updated successfully!');
    } catch (error) {
      console.error('Failed to update course:', error);
    }
  };

  if (isLoading || !course) {
    return <p className="p-6">Loading course...</p>;
  }

  return (
    <main className="w-full min-h-[89%] p-6">
      <div className='w-full flex justify-between'>
        <h1 className='font-medium text-2xl mb-6 underline'>{course.title}</h1>
        <p className='text-[#605f5f]'>{course.status}</p>
      </div>
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit Course</h2>
        <Button variant="default" onClick={handleUpdateCourse}>Publish Changes</Button>
      </header>

      <div className="flex space-x-4 mb-4 w-full justify-between">
        {['Preview'].map((tab) => (
          <Button key={tab} variant="ghost" className="text-gray-600">{tab}</Button>
        ))}
        <Link href={`/UploadCourses/${courseId}/AddChapter`}>
        <Button>Add Chapter</Button>
        </Link>
      </div>

      {/* Curriculum Section */}
      <div>
        {
          course?.chapters.length == 0 ? <p className='text-[#5e5e5e] text-center'>No content available</p> :
            course?.chapters?.map((chapter) => (
              <div key={chapter.id} className="mb-6">
                <div className="flex justify-between items-center py-2 px-4 border-b">
                  <div>
                    <h3 className="text-lg font-medium">{chapter.title}</h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm px-2 py-1 rounded ${chapter.status === 'PUBLISHED' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                      {chapter.status}
                    </span>
                    {confirmDeleteId === chapter.id ? (
                      <div className="flex space-x-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={async () => {
                            try {
                              await axios.delete(`/api/courses/${chapter.id}`);
                              setCourse((prev) => ({
                                ...prev!,
                                chapters: prev!.chapters.filter((c) => c.id !== chapter.id),
                              }));
                              setConfirmDeleteId(null);
                            } catch (err) {
                              console.error('Failed to delete chapter:', err);
                              alert('Failed to delete chapter.');
                            }
                          }}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreVertical className="cursor-pointer w-5 h-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32">
                          <Link href={`/UploadCourses/${courseId}/EditChapter/${chapter.id}`}>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            >
                            Edit
                          </DropdownMenuItem>
                            </Link>
                          <DropdownMenuItem
                            onClick={() => setConfirmDeleteId(chapter.id)}
                            className="text-red-600 cursor-pointer"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </main>
  );
};

export default CourseEditor;