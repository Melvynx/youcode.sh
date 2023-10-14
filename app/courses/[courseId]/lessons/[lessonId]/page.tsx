import { getAuthSession } from '@/auth/next-auth';
import { Suspense } from 'react';
import { Course } from './Course';
import { LessonsNavigation } from './LessonsNavigation';
import { MarkLessonAsInProgress } from './MarkLessonAsInProgress';
import { getLesson } from './lesson.query';

export default async function page({
  params,
}: {
  params: {
    courseId: string;
    lessonId: string;
  };
}) {
  const session = await getAuthSession();
  const lesson = await getLesson({
    lessonId: params.lessonId,
    userId: session?.user.id,
  });

  if (!lesson) {
    return 'Lesson not found.';
  }

  if (lesson.state === 'PUBLISHED') {
    if (lesson.course?.users.length === 0) {
      return 'You need to pay.';
    }
  }

  return (
    <div
      className="flex p-4 gap-4 h-full"
      style={{
        height: `calc(100vh - var(--header-height) - 1px)`,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <LessonsNavigation courseId={params.courseId} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Course
          lessonId={lesson.id}
          content={lesson.content}
          progress={lesson.progress}
        />
      </Suspense>
      <Suspense fallback={null}>
        <MarkLessonAsInProgress lessonId={lesson.id} />
      </Suspense>
    </div>
  );
}
