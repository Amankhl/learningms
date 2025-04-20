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
  <Link href={`/Courses/${id}`} className="bg-white w-[30%] max-md:w-[100%] p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
    {imgUrl && imgUrl?.length > 1 ? <Image src={imgUrl} alt='image' height={500} width={500} />
      : ''
    }
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-sm text-gray-500 mb-4">Instructor: {educatorname}</p>
      <div className='w-full flex justify-between items-center'>
        <Button variant='default'>
          Go to course
        </Button>
        <p className='text-sm text-gray-500 mb-4'>{createdAt?.split('T')[0]}</p>
      </div>
    </div>
  </Link>
);