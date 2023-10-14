import { getAuthSession } from '@/auth/next-auth';
import { prisma } from '@/db/prisma';

export const MarkLessonAsInProgress = async ({ lessonId }: { lessonId: string }) => {
  const session = await getAuthSession();
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  try {
    await prisma.lessonOnUser.create({
      data: {
        userId,
        lessonId,
        progress: 'IN_PROGRESS',
      },
    });
  } catch {
    return null;
  }

  return null;
};
