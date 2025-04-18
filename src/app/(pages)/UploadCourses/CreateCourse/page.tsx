'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';

export default function CreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await axios.post('/api/courses', {
        title,
        description,
        content,
        videoUrl,
      });

      router.push('/UploadCourses');
    } catch (error) {
      console.error('Failed to upload course:', error);
      alert('Failed to upload course');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a New Course</h1>
      <Input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Course Title"
      />
      <Input
        className="mt-4"
        value={videoUrl}
        onChange={e => setVideoUrl(e.target.value)}
        placeholder="Video URL (optional)"
      />
      <Textarea
        className="mt-4"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Short description"
      />
      <Textarea
        className="mt-4 h-40"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Course Content (Markdown/HTML)"
      />
      <Button className="mt-6 w-full" onClick={handleSubmit}>
        Upload Course
      </Button>
    </div>
  );
}
