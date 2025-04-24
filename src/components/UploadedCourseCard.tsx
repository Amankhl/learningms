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
    <Link className='w-[30%] max-md:w-[100%]' href={`/UploadCourses/${id}`}>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow h-[450px] flex flex-col justify-between overflow-hidden">
            {img && img.length > 1 ? (
                <div className="w-full h-[180px] relative mb-4 rounded-md overflow-hidden">
                    <Image
                        src={img}
                        alt="image"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            ) : (
                <div className="w-full h-[180px] mb-4 bg-gray-100 rounded-md" />
            )}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-semibold mb-1">{title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">{description}</p>
                    <p className="text-sm text-gray-500 mb-2">Instructor: {instructor}</p>
                </div>
                <div className='w-full flex justify-between items-center mt-auto'>
                    <Button variant={status === 'PUBLISHED' ? 'secondary' : 'default'}>
                        {status}
                    </Button>
                    <p className='text-sm text-gray-500'>{createdAt?.split('T')[0]}</p>
                </div>
            </div>
        </div>
    </Link>
);
