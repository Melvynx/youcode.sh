import { authenticatedAction } from '@/components/lib/safe-actions';
import { prisma } from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const completLesson = authenticatedAction(
  z.object({
    lessonId: z.string(),
  }),
  async ({ lessonId }, { userId }) => {
    const updatedLesson = await prisma.lessonOnUser.update({
      where: {
        userId_lessonId: {
          lessonId,
          userId,
        },
      },
      select: {
        lesson: {
          select: {
            rank: true,
            courseId: true,
            id: true,
          },
        },
      },
      data: {
        progress: 'COMPLETED',
      },
    });

    const nextLesson = await prisma.lesson.findFirst({
      where: {
        courseId: updatedLesson.lesson.courseId,
        rank: {
          gt: updatedLesson.lesson.rank,
        },
        state: {
          in: ['PUBLIC', 'PUBLISHED'],
        },
      },
      orderBy: {
        rank: 'asc',
      },
      take: 1,
    });

    revalidatePath(
      `/courses/${updatedLesson.lesson.courseId}/lessons/${updatedLesson.lesson.id}`
    );

    if (nextLesson) {
      redirect(
        `/courses/${updatedLesson.lesson.courseId}/lessons/${nextLesson?.id}`
      );
    }
  }
);
