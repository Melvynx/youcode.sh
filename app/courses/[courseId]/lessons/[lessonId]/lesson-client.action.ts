import { prisma } from '@/lib/prisma';
import { authenticatedAction } from '@/lib/safe-actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const handleLessonState = authenticatedAction(
  z.object({
    lessonId: z.string(),
    state: z.enum(['COMPLETED', 'IN_PROGRESS']),
  }),
  async ({ lessonId, state }, { userId }) => {
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
        progress: state,
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
