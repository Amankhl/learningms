'use client'

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

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
        <div className="max-w-xl mx-auto p-6 space-y-4 min-h-[85%]">
            <div className='w-full flex justify-between'>
                <h1 className="text-xl font-semibold mb-4">Add Chapter</h1>
                {/* <Button onClick={() => router.refresh()}>Reload</Button> */}
            </div>
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

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Chapter Content"
                className="w-full border rounded p-2 min-h-[150px]"
            />

            <Button onClick={handleUpdate}>Create</Button>
        </div>
    );
};

export default AddChapter;
