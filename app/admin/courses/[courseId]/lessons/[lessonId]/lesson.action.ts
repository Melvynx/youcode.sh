'use server';

import { getAuthSession } from '@/auth/next-auth';
import { prisma } from '@/db/prisma';

export const editLessonContent = async (lessonId: string, markdown: string) => {
  const session = await getAuthSession();

  if (!session?.user.id) {
    throw new Error('Unauthorized');
  }

  await prisma.lesson.update({
    where: {
      id: lessonId,
      course: {
        creatorId: session.user.id,
      },
    },
    data: {
      content: markdown,
    },
  });

  return 'ok';
};
