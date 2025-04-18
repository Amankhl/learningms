import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { getUserFromServer } from '@/actions/profile';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
    try {
      const user = getUserFromServer();
  
      if (!user || user.role !== 'EDUCATOR') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const result = await sql`
        SELECT 
          c.id, c.title, c.description, c.content, c."videoUrl", c."imgUrl", c.status, c."createdAt",
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



export async function POST(req: Request) {
  try {
    const user = getUserFromServer();

    if (!user || user.role !== 'EDUCATOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, content, videoUrl } = await req.json();

    if (!title || !description || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO "Course" (title, description, content, "videoUrl", "educatorId")
      VALUES (${title}, ${description}, ${content}, ${videoUrl}, ${user.id})
      RETURNING id, title, description, content, "videoUrl", "createdAt"
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('POST /api/courses error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
