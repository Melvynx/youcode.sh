import { getAuthSession } from '@/auth/next-auth';
import { LessonsNavigationMenu } from './LessonsNavigationMenu';
import { getLessons } from './lesson.query';

export const LessonsNavigation = async ({ courseId }: { courseId: string }) => {
  const session = await getAuthSession();
  const lessons = await getLessons({
    courseId: courseId,
    userId: session?.user?.id,
  });
  return <LessonsNavigationMenu lessons={lessons} courseId={courseId} />;
};
