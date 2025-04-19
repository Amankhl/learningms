import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';


const sql = neon(process.env.DATABASE_URL!);


// api/courses/[id] - /UploadCourses/[courseId]/page.tsx -GET
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const courseId = Number(params.id);
        if (isNaN(courseId)) {
            return NextResponse.json({ error: 'Invalid course ID' }, { status: 400 });
        }

        const courseResult = await sql`
            SELECT id, title, description, "videoUrl", "imgUrl", status, "createdAt", "educatorId"
            FROM "Course"
            WHERE id = ${courseId}
        `;

        if (courseResult.length === 0) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        const course = courseResult[0];

        const chaptersResult = await sql`SELECT id, title, status, "createdAt", "updatedAt" FROM "Chapter" WHERE "courseId" = ${courseId} ORDER BY "createdAt" ASC `;
        // console.log(chaptersResult)

        const courseWithChapters = {
            ...course,
            chapters: chaptersResult,
        };

        return NextResponse.json(courseWithChapters);
    } catch (error) {
        console.error('GET /api/courses/[id] error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}


// api/courses/[id] - /UploadCourses/[courseId]/page.tsx  - Publish Changes (PUT)
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const courseId = Number(params.id);
        if (isNaN(courseId)) {
            return NextResponse.json({ error: 'Invalid course ID' }, { status: 400 });
        }

        const {
            title,
            description,
        } = await request.json();
        const status = 'PUBLISHED'
        await sql`
      UPDATE "Course"
      SET 
        title = ${title},
        description = ${description},
        status = ${status}
      WHERE id = ${courseId}
    `;

        return NextResponse.json({ message: 'Course updated successfully' });
    } catch (error) {
        console.error('PUT /api/courses/[id] error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const chapterId = Number(params.id);
  
    if (isNaN(chapterId)) {
      return NextResponse.json({ error: 'Invalid chapter ID' }, { status: 400 });
    }
  
    try {
      const result = await sql`
        DELETE FROM "Chapter" WHERE id = ${chapterId}
      `;
  
      return NextResponse.json({ message: 'Chapter deleted successfully.' });
    } catch (error) {
      console.error(`DELETE /api/chapters/${chapterId} error:`, error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }


// For Adding New Chapters
  // /api/courses/[id] - /UploadCourses/[courseId]/AddChapter/page.tsx - Post
  export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    const now = new Date();
    const body = await req.json();
    const { title, status, content } = body;
  
    try {
      await sql`
        INSERT INTO "Chapter" (title, status, content, "courseId", "updatedAt")
        VALUES (${title}, ${status}, ${content}, ${id}, ${now})
        RETURNING id, title, "courseId"
      `;
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Add error:', error);
      return NextResponse.json({ error: 'Failed to add chapter' }, { status: 500 });
    }
  }
  