'use client'
import React, { useEffect, useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useProfile } from '@/context/ProfileContext';
import { useRouter } from 'next/navigation';
import { getUserAttendance, profileDetails, User } from '@/actions/users';
import { EnrolledCourse, getEnrolledCourses } from '@/actions/courses';

const chartData = [
  { month: 'January', hours: 266, streak: 10 },
  { month: 'February', hours: 505, streak: 20 },
  { month: 'March', hours: 357, streak: 25 },
  { month: 'April', hours: 263, streak: 15 },
  { month: 'May', hours: 339, streak: 30 },
  { month: 'June', hours: 354, streak: 22 },
];

const chartConfig = {
  daysPresent: {
    label: 'Days Present',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;


const userData = {
  name: 'Ayush Nigam',
  username: 'ayush',
  email: 'ayush@example.com',
  image: 'https://poetsandquants.com/wp-content/uploads/sites/5/2019/03/Emily-Gordon-Siddharth-Rao-headshot-Class-of-2020-PQ-Student-Profile-Yale-SOM.jpg',
  enrolledCourses: [
    { id: 1, title: 'React Basics' },
    { id: 2, title: 'Advanced Node.js' },
    { id: 3, title: 'Database Management' },
  ],
  role: 'Student',
  joinedDate: 'April 6, 2025',
};

const Profile = () => {

  const { user, logout } = useProfile();
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const [me, setMe] = useState<User | any>(null)
  const [courses, setCourses] = useState<EnrolledCourse[]>([])
  const [chartData, setChartData] = useState<{ month: string; daysPresent: number }[]>([]);

  if (!user) {
    router.push('/Login')
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await profileDetails();
      if (data && data.length > 0) {
        setMe(data[0]);
      } else {
        setMe(null);
      }
      const attendance = await getUserAttendance();
      console.log(attendance)
      setChartData(attendance);
    };
    const fetchCourses = async () => {
      const result = await getEnrolledCourses()
      setCourses(result)
    }
    fetchCourses()
    fetchData()
  }, []);

  // console.log(courses)

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <Card>
        <CardHeader>
          <div className='w-full flex justify-between'>
            <CardTitle>Your Profile</CardTitle>
            <Button
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  await logout();
                  router.push("/Login");
                });
              }}
            >
              {isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userData.image} alt={me?.name || 'User'} />
              <AvatarFallback>{userData.name}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{me?.name}</h2>
              <p className="text-gray-600">@{me?.name}</p>
              <p className="text-gray-600">{me?.email}</p>
              <p className="text-gray-600">Role: {me?.role}</p>
              <p className="text-gray-600">Joined: {userData.joinedDate}</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8">{me?.role === "EDUCATOR" ? "Courses Created" : "Enrolled Courses"}</h3>
          <ul className="mt-4 space-y-2">
            {courses.length === 0 ? (
              <p className='text-[#595757]'>You haven't enrolled in any course</p>
            ) : (
              courses.map((course) => (
                <li key={course.id} className="flex justify-between items-center border-b pb-2">
                  <span>{course.title}</span>
                  <Button variant="link" onClick={() => router.push(`/Courses/${course.id}`)}>View Course</Button>
                </li>
              ))
            )}

          </ul>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4'>

        <Card>
          <CardHeader>
            <CardTitle>Total Learning Hours</CardTitle>
            <p>Track your learning progress and streaks over the last 6 months</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart data={chartData} margin={{ top: 20, left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey="daysPresent"
                  type="natural"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-desktop)",
                  }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Displaying learning hours and streaks for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
