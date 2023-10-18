'use server';

import { prisma } from '@/lib/prisma';
import { ActionError, authenticatedAction } from '@/lib/safe-actions';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const joinCourseAction = authenticatedAction(
  z.object({
    courseId: z.string(),
  }),
  async ({ courseId }, { userId }) => {
    const courseOnUser = await prisma.courseOnUser.create({
      data: {
        courseId: courseId,
        userId,
      },
      select: {
        course: {
          select: {
            id: true,
            lessons: {
              where: {
                state: {
                  in: ['PUBLIC', 'PUBLISHED'],
                },
              },
              select: {
                id: true,
              },
              take: 1,
              orderBy: {
                rank: 'asc',
              },
            },
          },
        },
      },
    });

    const lessonId = courseOnUser.course.lessons[0]?.id;

    if (!lessonId) {
      throw new ActionError("This course doesn't have any lessons.");
    }

    revalidatePath(`/courses/${courseId}`);
    return `/courses/${courseId}/lessons/${courseOnUser.course.lessons[0]?.id}`;
  }
);
