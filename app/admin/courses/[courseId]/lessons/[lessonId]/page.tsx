import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from '@/components/ui/loading';
import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';
import { LessonEditorAutoSave } from './LessonEditorAutoSave';
import { LessonForm } from './LessonForm';

export default async function Page({
  params,
}: {
  params: {
    courseId: string;
    lessonId: string;
  };
}) {
  const lesson = await prisma.lesson.findFirstOrThrow({
    where: {
      id: params.lessonId,
    },
    select: {
      id: true,
      name: true,
      state: true,
      content: true,
    },
  });

  return (
    <div
      className="w-full flex flex-col lg:flex-row lg:items-start gap-4 p-4  xl:gap-6 m-auto"
      style={{
        height: `calc(100vh - var(--header-height) - 1px)`,
      }}
    >
      <Card className="lg:max-w-xs w-full">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <LessonForm {...lesson} />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Loader />}>
            <LessonEditorAutoSave markdown={lesson.content} lessonId={lesson.id} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
