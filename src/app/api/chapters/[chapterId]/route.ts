import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
const sql = neon(process.env.DATABASE_URL!);



// /api/chapters/[chapterId] - /UploadCourses/[courseId]/EditChapter/[chapterId]/page.tsx - Get
export async function GET(
  req: NextRequest,
  { params }: { params: { chapterId: string } }
) {
  const id = Number(params.chapterId);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const chapter = await sql`
    SELECT id, title, status, content FROM "Chapter" WHERE id = ${id}
  `;

  if (!chapter.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(chapter[0]);
}


// /api/chapters/[chapterId] - /UploadCourses/[courseId]/EditChapter/[chapterId]/page.tsx - Put
export async function PUT(
  req: NextRequest,
  { params }: { params: { chapterId: string } }
) {
  const id = Number(params.chapterId);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const body = await req.json();
  const { title, status } = body;

  try {
    await sql`
      UPDATE "Chapter"
      SET title = ${title}, status = ${status}
      WHERE id = ${id}
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update chapter' }, { status: 500 });
  }
}

