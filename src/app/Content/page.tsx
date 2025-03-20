'use client'
import React, { useState } from 'react';
import { MoreVertical, Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const items = [
  { title: 'Dashboard', url: '#', icon: Home },
  { title: 'Courses', url: '#', icon: Inbox },
  { title: 'Certifications', url: '#', icon: Calendar },
  { title: 'Guides', url: '#', icon: Search },
  { title: 'Quiz', url: '#', icon: Settings },
];

const CourseEditor = () => {
  const [chapters, setChapters] = useState([
    {
      title: 'Introduction to Git',
      lessons: ['History of Git', 'Install Git on Mac & Windows', 'Basic Git Commands', 'Test your Git skills', 'Git commit & logs'],
      status: ['Draft', 'Draft', 'Draft', 'Published', 'Published']
    },
    {
      title: 'Git branching',
      lessons: ['Feature branch', 'Merging multiple branches', 'Git rebase', 'Test your Git skills', 'Git branch commands'],
      status: ['Draft', 'Draft', 'Draft', 'Published', 'Published']
    }
  ]);

  return (
        <main className="w-full p-6">
          <header className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Edit Course</h2>
            <Button variant="secondary">Publish Changes</Button>
          </header>

          <div className="flex space-x-4 mb-4">
            {['Settings', 'Curriculum', 'Preview'].map((tab) => (
              <Button key={tab} variant="ghost" className="text-gray-600">{tab}</Button>
            ))}
          </div>

          {/* Curriculum Section */}
          <div>
            {chapters.map((chapter, chapterIndex) => (
              <div key={chapterIndex} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">{chapter.title}</h3>
                  <Button variant="outline">Add Content</Button>
                </div>
                <ul>
                  {chapter.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} className="flex justify-between items-center py-2 px-4 border-b">
                      <span>{lesson}</span>
                      <div className="flex items-center space-x-4">
                        <span className={`text-sm px-2 py-1 rounded ${chapter.status[lessonIndex] === 'Published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>{chapter.status[lessonIndex]}</span>
                        <MoreVertical className="cursor-pointer" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </main>
  );
};

export default CourseEditor;