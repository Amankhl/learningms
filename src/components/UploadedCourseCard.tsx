import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

type Course = {
    id: number;
    title: string;
    description: string;
    instructor: string;
    img?: string | any;
    status: string;
    createdAt?: string;
};

export const UploadedCourseCard = ({ id, title, description, instructor, status, img, createdAt }: Course) => (

    <Link className='w-[30%]' href={`/UploadCourses/${id}`}>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            {img && img.length > 1 ? <Image src={img} alt='image' height={500} width={500} />
                : ''
            }
            <div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <p className="text-sm text-gray-500 mb-4">Instructor: {instructor}</p>
                <div className='w-full flex justify-between items-center'>
                    <Button variant={status === 'PUBLISHED' ? 'secondary' : 'default'}>
                        {status}
                    </Button>
                    <p className='text-sm text-gray-500 mb-4'>{createdAt?.split('T')[0]}</p>
                </div>
            </div>
        </div>
    </Link>
);