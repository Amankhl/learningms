import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { getUserFromServer } from '@/actions/profile';

const sql = neon(process.env.DATABASE_URL!);


// /api/courses  - UploadCourses/page.tsx
export async function GET() {
    try {
      const user = getUserFromServer();
  
      if (!user || user.role !== 'EDUCATOR') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const result = await sql`
        SELECT 
          c.id, c.title, c.description, c."videoUrl", c."imgUrl", c.status, c."createdAt",
          u.name as educatorName
        FROM "Course" c
        JOIN "User" u ON c."educatorId" = u.id
        WHERE c."educatorId" = ${user.id}
        ORDER BY c."createdAt" DESC
      `;
  
      return NextResponse.json(result)
    } catch (error) {
      console.error('GET /api/courses error:', error);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
  }  


// /api/courses  - /UploadCourses/CreateCourse/page.tsx - Post
export async function POST(req: Request) {
  try {
    const user = getUserFromServer();

    if (!user || user.role !== 'EDUCATOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, imgUrl } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO "Course" (title, description, "imgUrl", "educatorId")
      VALUES (${title}, ${description}, ${imgUrl}, ${user.id})
      RETURNING id, title, description, "imgUrl", "createdAt"
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('POST /api/courses error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
