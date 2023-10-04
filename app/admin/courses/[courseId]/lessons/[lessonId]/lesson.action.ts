'use server';

import { getAuthSession } from '@/auth/next-auth';
import { prisma } from '@/db/prisma';
import { LessonFormSchema } from './lesson-form.schema';

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

export const editLesson = async (lessonId: string, unsafeData: LessonFormSchema) => {
  const data = LessonFormSchema.parse(unsafeData);

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
    data: data,
  });

  return 'ok';
};
