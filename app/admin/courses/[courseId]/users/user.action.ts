'use server';

import { authenticatedAction } from '@/components/lib/safe-actions';
import { prisma } from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const updateUserOnCourseStatus = authenticatedAction(
  z.object({
    userId: z.string(),
    courseId: z.string(),
    cancel: z.boolean(),
  }),
  async ({ userId, courseId, cancel }, { userId: currentUserId }) => {
    const user = await prisma.courseOnUser.findMany({
      where: {
        userId: userId,
      },
    });

    console.log({ user });

    await prisma.courseOnUser.updateMany({
      where: {
        userId: userId,
        courseId: courseId,
        course: {
          creatorId: currentUserId,
        },
      },
      data: {
        canceledAt: cancel ? new Date() : null,
      },
    });

    revalidatePath(`/admin/courses/${courseId}`);

    return 'ok';
  }
);
