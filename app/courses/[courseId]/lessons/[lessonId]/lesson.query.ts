import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getLesson = async ({
  lessonId,
  userId,
}: {
  lessonId: string;
  userId?: string;
}) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
      state: {
        in: ['PUBLISHED', 'PUBLIC'],
      },
    },
    select: {
      content: true,
      createdAt: true,
      id: true,
      name: true,
      rank: true,
      state: true,
      course: {
        select: {
          users: {
            where: {
              userId: userId,
            },
            select: {
              canceledAt: true,
              createdAt: true,
              id: true,
            },
          },
        },
      },
      users: {
        where: {
          userId,
        },
        select: {
          progress: true,
          id: true,
        },
      },
    },
  });

  if (!lesson) {
    return null;
  }

  return {
    ...lesson,
    progress: lesson?.users[0]?.progress,
  };
};

export type LessonType = Prisma.PromiseReturnType<typeof getLesson>;

export const getLessons = async ({
  courseId,
  userId = 'error',
}: {
  courseId: string;
  userId?: string;
}) => {
  const lessons = await prisma.lesson.findMany({
    where: {
      courseId,
      state: {
        in: ['PUBLISHED', 'PUBLIC'],
      },
    },
    orderBy: {
      rank: 'asc',
    },
    select: {
      id: true,
      name: true,
      rank: true,
      state: true,
      createdAt: true,
      users: {
        where: {
          userId: userId,
        },
        select: {
          id: true,
          progress: true,
        },
      },
    },
  });

  return lessons.map((l) => ({
    ...l,
    progress: l.users[0]?.progress,
  }));
};

export type LessonsType = Prisma.PromiseReturnType<typeof getLessons>;
