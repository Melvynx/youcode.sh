'use server';

import { getTheMiddleRank } from '@/components/lib/getTheMiddleRank';
import { authenticatedAction } from '@/components/lib/safe-actions';
import { prisma } from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { LessonFormSchema } from './lesson-form.schema';

export const editLessonContent = authenticatedAction(
  z.object({
    id: z.string(),
    markdown: z.string(),
  }),
  async ({ id, markdown }, { userId }) => {
    await prisma.lesson.update({
      where: {
        id,
        course: {
          creatorId: userId,
        },
      },
      data: {
        content: markdown,
      },
    });

    return 'ok';
  }
);

export const editLesson = authenticatedAction(
  z.object({
    id: z.string(),
    data: LessonFormSchema,
  }),
  async ({ id, data }, { userId }) => {
    await prisma.lesson.update({
      where: {
        id: id,
        course: {
          creatorId: userId,
        },
      },
      data: data,
    });

    revalidatePath(`/admin/courses/${id}/lessons`);

    return 'ok';
  }
);

export const newLessonAction = authenticatedAction(
  z.object({
    courseId: z.string(),
  }),
  async ({ courseId }, { userId }) => {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        creatorId: true,
      },
    });

    if (!course) {
      throw new Error('Course not found');
    }

    if (course.creatorId !== userId) {
      throw new Error('You are not the creator of this course');
    }

    // get last lesson order by rank
    const lastLesson = await prisma.lesson.findFirst({
      where: {
        courseId: courseId,
      },
      orderBy: {
        rank: 'desc',
      },
    });

    const newRank = getTheMiddleRank(lastLesson?.rank, undefined);

    const lesson = await prisma.lesson.create({
      data: {
        courseId: courseId,
        name: 'Draft Lesson',
        content: '',
        rank: newRank,
      },
    });

    revalidatePath(`/admin/courses/${courseId}/lessons`);
    redirect(`/admin/courses/${courseId}/lessons/${lesson.id}`);
  }
);

export const saveLessonMove = authenticatedAction(
  z.object({
    upItemRank: z.string().optional(),
    downItemRank: z.string().optional(),
    lessonId: z.string(),
  }),
  async ({ upItemRank, downItemRank, lessonId }, { userId }) => {
    const course = await prisma.course.findFirst({
      where: {
        lessons: {
          some: {
            id: lessonId,
            course: {
              creatorId: userId,
            },
          },
        },
      },
    });

    if (!course) {
      throw new Error('Course not found');
    }

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    const newRank = getTheMiddleRank(upItemRank, downItemRank);

    await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        rank: newRank,
      },
    });

    return 'ok';
  }
);
