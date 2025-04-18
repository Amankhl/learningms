import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';


const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const courseId = Number(params.id);
        if (isNaN(courseId)) {
            return NextResponse.json({ error: 'Invalid course ID' }, { status: 400 });
        }

        const courseResult = await sql`
            SELECT id, title, description, content, "videoUrl", "imgUrl", status, "createdAt", "educatorId"
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
            content,
            videoUrl,
            imgUrl,
            status
        } = await request.json();

        await sql`
      UPDATE "Course"
      SET 
        title = ${title},
        description = ${description},
        content = ${content},
        "videoUrl" = ${videoUrl},
        "imgUrl" = ${imgUrl},
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