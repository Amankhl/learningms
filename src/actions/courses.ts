'use server'
import { neon } from "@neondatabase/serverless";
import { useProfile } from "@/context/ProfileContext";

export type EnrolledCourse = {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
};


export async function getEnrolledCourses(): Promise<EnrolledCourse[]> {
    try {
        const user = useProfile();
        const sql = neon(process.env.DATABASE_URL!);
        const result = await sql`
        SELECT c.id, c.title, c.description, c."createdAt"
        FROM "Enrollment" e
        JOIN "Course" c ON c.id = e."courseId"
        WHERE e."userId" = ${user.user?.id}
      `
        const enrolledCourses = result as EnrolledCourse[];
        return enrolledCourses;
    } catch (error) {
        console.error('[GET_ENROLLED_COURSES_ERROR]', error)
        return []
    }
}