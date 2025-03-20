import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const CourseCard = ({ title, description, instructor, status, img }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <Image src={img} alt='image' height={500} width={500} />
        <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-sm text-gray-500 mb-4">Instructor: {instructor}</p>
      <Button variant={status === 'Enrolled' ? 'secondary' : 'default'}>
        {status === 'Enrolled' ? 'Continue Course' : 'Enroll Now'}
      </Button>
        </div>
    </div>
  );