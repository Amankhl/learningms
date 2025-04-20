'use client'

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import TextEditor from '@/components/TextEditor';

const AddChapter = () => {
    const { courseId } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
    const [content, setContent] = useState('');
    const [chapNum, setChapNum] = useState<number>()
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        try {
            setLoading(true)
            await axios.post(`/api/courses/${courseId}`, {
                title,
                status,
                content,
                chapNum
            });
            // alert('Chapter Added!');
            router.refresh();
            router.push(`/UploadCourses/${courseId}`);
            setLoading(false)
        } catch (error) {
            console.error('Update failed:', error);
            alert('Chapter is not added!');
        }
    };

    if (loading) return <div className="p-6 text-center min-h-[85%]">Loading...</div>;

    return (
        <div className="w-full min-h-screen p-6 space-y-6 bg-gray-50">
            <div className='flex justify-between items-center'>
                <h1 className="text-2xl font-bold">Add Chapter</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="number"
                    value={chapNum}
                    onChange={(e) => setChapNum(Number(e.target.value))}
                    placeholder="Chapter Number"
                />
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Chapter Title"
                />
                <Select value={status} onValueChange={(val) => setStatus(val as 'DRAFT' | 'PUBLISHED')}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="w-full">
                <TextEditor content={content} setContent={setContent} />
            </div>

            <div className="w-full flex justify-end">
                <Button onClick={handleUpdate} className="w-full md:w-auto">
                    Create
                </Button>
            </div>
        </div>
    );
};

export default AddChapter;
