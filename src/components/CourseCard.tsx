import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

type Course = {
  id: number;
  title: string;
  description: string;
  educatorname: string;
  imgUrl?: string;
  createdAt?: string;
};

export const CourseCard = ({ id, title, description, educatorname, imgUrl, createdAt }: Course) => (
  <Link href={`/Courses/${id}`} className="bg-white w-[30%] max-md:w-[100%] p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow h-[450px] flex flex-col justify-between overflow-hidden">
    {imgUrl && imgUrl.length > 1 ? (
      <div className="w-full h-[180px] relative mb-4 rounded-md overflow-hidden">
        <Image
          src={imgUrl}
          alt="Course image"
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
        <p className="text-sm text-gray-500 mb-2">Instructor: John</p>
      </div>
      <div className='w-full flex justify-between items-center mt-auto'>
        <Button variant='default'>
          Go to course
        </Button>
        <p className='text-sm text-gray-500'>{createdAt?.split('T')[0]}</p>
      </div>
    </div>
  </Link>
);
