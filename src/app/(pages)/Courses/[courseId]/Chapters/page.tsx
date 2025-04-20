'use client';

import { useEffect, useState } from "react";
import { getPaginatedChapters } from "@/actions/courses";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChaptersPage({ params }: { params: { courseId: string } }) {
  const [chapters, setChapters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 1;

  useEffect(() => {
    async function fetchChapters() {
      setLoading(true);
      const res = await getPaginatedChapters(Number(params.courseId), page, pageSize);
      console.log(res)
      setChapters(res.chapters);
      setTotal(res.total);
      setLoading(false);
    }
    fetchChapters();
  }, [page, params.courseId]);

  return (
    <div className="py-6 w-full min-h-[90%] px-2">
      <h2 className="text-3xl font-bold mb-6">Course Chapters</h2>

      {loading ? (
        <Skeleton className="w-full min-h-96 rounded-xl" />
      ) : (
        chapters.map((chap) => (
          <Card key={chap.id} className="mb-6 w-full min-h-96 shadow-md">
            <CardContent className="p-6 space-y-2">
              <h3 className="text-xl font-semibold">Chapter: {chap.title}</h3>
              <p className="border mb-4"></p>
              <div
                className="prose prose-sm max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: chap.content }}
              />
            </CardContent>
          </Card>
        ))
      )}

      <div className="flex justify-between mt-8 px-20">
        <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </Button>
        <Button variant="outline" disabled={page >= Math.ceil(total / pageSize)} onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
