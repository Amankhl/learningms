// app/Courses/[courseId]/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { getCourseDetails, enrollInCourse } from "@/actions/courses";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    async function fetchCourse() {
      const data = await getCourseDetails(Number(params.courseId));
      setCourse(data);
    }
    fetchCourse();
  }, [params.courseId]);

  const handleEnroll = async () => {
    const res = await enrollInCourse(Number(params.courseId));
    if (res?.success) {
      setCourse((prev: any) => ({ ...prev, isEnrolled: true }));
    }
  };

  if (!course) return <div className="min-h-[90%]">Loading...</div>;

  return (
    <div className="p-6 min-h-[90%]">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p>{course.description}</p>

      {course.isEnrolled ? (
        <Link href={`/Courses/${params.courseId}/Chapters`}>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            Go to Course
          </button>
        </Link>
      ) : (
        <button
          onClick={handleEnroll}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enroll Now
        </button>
      )}
    </div>
  );
}
