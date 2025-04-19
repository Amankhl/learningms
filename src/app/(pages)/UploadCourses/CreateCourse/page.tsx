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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageUpload = async () => {
    if (!imageFile) return '';

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return res.data.secure_url;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const imgUrl = await handleImageUpload();

      const result = await axios.post('/api/courses', {
        title,
        description,
        imgUrl,
      });

      const id = result.data.id;
      router.push(`/UploadCourses/${id}/AddChapter`);
    } catch (error) {
      console.error('Failed to upload course:', error);
      alert('Failed to upload course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto min-h-[90%]">
      <h1 className="text-2xl font-bold mb-4">Create a New Course</h1>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Course Title"
      />
      <Input
        className="mt-4"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setImageFile(file);
          }
        }}
      />
      <Textarea
        className="mt-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Short description"
      />
      <Button className="mt-6 w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Creating...' : 'Create Course'}
      </Button>
    </div>
  );
}
