import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAuthSession } from '@/lib/next-auth';
import { Suspense } from 'react';
import { Lesson } from './Lesson';
import { LessonPlaceholder } from './LessonPlaceholder';
import { LessonsNavigation } from './LessonsNavigation';
import { MarkLessonAsInProgress } from './MarkLessonAsInProgress';
import { getLesson } from './lesson.query';
import { LessonNavigationMenuPlaceholder } from './placehlder/LessonNavigationMenuPlaceholder';

export default async function page(
  props: {
    params: Promise<{
      courseId: string;
      lessonId: string;
    }>;
  }
) {
  const params = await props.params;
  const session = await getAuthSession();
  const lesson = await getLesson({
    lessonId: params.lessonId,
    userId: session?.user.id,
  });

  if (!lesson) {
    return 'Lesson not found.';
  }

  if (lesson.state === 'PUBLISHED') {
    if (lesson.course.users.length === 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>You need to join the course</CardTitle>
            <CardDescription>
              In order to access the lesson, you need to join the course.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }
  }

  return (
    <div
      className="flex p-2 lg:p-4 gap-4 h-full relative"
      style={{
        height: `calc(100vh - var(--header-height) - 1px)`,
      }}
    >
      <Suspense fallback={<LessonNavigationMenuPlaceholder />}>
        <LessonsNavigation courseId={params.courseId} />
      </Suspense>
      <Suspense fallback={<LessonPlaceholder />}>
        <Lesson
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
