import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const publishedCourses = await sql`
      SELECT 
        c.*, 
        u.name AS educatorName, 
        u.email AS educatorEmail 
      FROM "Course" c
      JOIN "User" u ON c."educatorId" = u.id
      WHERE c."status" = 'PUBLISHED'
      ORDER BY c."createdAt" ASC;
    `;
    // console.log(publishedCourses)
    return NextResponse.json(publishedCourses);
  } catch (error) {
    console.error('[RAW_SQL_COURSES_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}