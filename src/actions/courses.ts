'use server'
import { neon } from "@neondatabase/serverless";
import { getUserFromServer } from "./profile";

export type EnrolledCourse = {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
};


export async function getEnrolledCourses(): Promise<EnrolledCourse[]> {
    try {
        const user = getUserFromServer()
        const id = user?.id
        const sql = neon(process.env.DATABASE_URL!);
        const result = await sql`
        SELECT c.id, c.title, c.description, c."createdAt"
        FROM "Enrollment" e
        JOIN "Course" c ON c.id = e."courseId"
        WHERE e."userId" = ${id}
      `
        const enrolledCourses = result as EnrolledCourse[];
        return enrolledCourses;
    } catch (error) {
        console.error('[GET_ENROLLED_COURSES_ERROR]', error)
        return []
    }
}


export async function enrollInCourse(courseId: number) {
    try {
      const user = getUserFromServer();
      if (!user?.id) return { success: false };
  
      const sql = neon(process.env.DATABASE_URL!);
  
      await sql`
        INSERT INTO "Enrollment" ("userId", "courseId")
        VALUES (${user.id}, ${courseId})
        ON CONFLICT DO NOTHING
      `;
  
      return { success: true };
    } catch (error) {
      console.error('[ENROLL_IN_COURSE]', error);
      return { success: false };
    }
  }


// actions/courses.ts

export async function getCourseDetails(courseId: number) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const user = getUserFromServer();

    const course = await sql`
      SELECT id, title, description, "createdAt"
      FROM "Course"
      WHERE id = ${courseId}
    `;

    const enrollment = await sql`
      SELECT id
      FROM "Enrollment"
      WHERE "courseId" = ${courseId} AND "userId" = ${user?.id}
    `;

    return {
      ...course[0],
      isEnrolled: enrollment.length > 0,
    };
  } catch (error) {
    console.error('[GET_COURSE_DETAILS_ERROR]', error);
    return null;
  }
}



export async function getPaginatedChapters(courseId: number, page = 1, pageSize = 1) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const offset = (page - 1) * pageSize;

    const chapters = await sql`
      SELECT id, "chapNum", title, content
      FROM "Chapter"
      WHERE "courseId" = ${courseId} AND status = 'PUBLISHED'
      ORDER BY "chapNum" ASC
      LIMIT ${pageSize} OFFSET ${offset}
    `;

    const totalResult = await sql`
      SELECT COUNT(*) as total
      FROM "Chapter"
      WHERE "courseId" = ${courseId} AND status = 'PUBLISHED'
    `;

    const total = Number(totalResult[0]?.total ?? 0);

    return { chapters, total };
  } catch (error) {
    console.error('[GET_PAGINATED_CHAPTERS]', error);
    return { chapters: [], total: 0 };
  }
}



export const deleteCourse = async (courseId: number) => {
  if (isNaN(courseId)) {
    throw new Error('Invalid course ID');
  }
  try {
    const sql = neon(process.env.DATABASE_URL!);

    await sql`DELETE FROM "Chapter" WHERE "courseId" = ${courseId};`

    await sql`DELETE FROM "Enrollment" WHERE "courseId" = ${courseId};`

    await sql`DELETE FROM "Course" WHERE "id" = ${courseId};`

    return { success: true, message: 'Course and related data deleted successfully.' }
  } catch (error) {
    console.error('[DELETE_COURSE_ERROR]', error)
    return { success: false, message: 'Failed to delete course.' }
  }
}