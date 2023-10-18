import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getCourse = async (courseId: string, userId = 'error') => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      name: true,
      presentation: true,
      image: true,
      creator: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      users: {
        select: {
          userId: true,
        },
        where: {
          userId: userId,
        },
      },

      lessons: {
        orderBy: {
          rank: 'asc',
        },
        select: {
          name: true,
          rank: true,
          id: true,
          state: true,
          users: {
            where: {
              userId: userId,
            },
            select: {
              progress: true,
            },
          },
        },
        where: {
          state: {
            in: ['PUBLIC', 'PUBLISHED'],
          },
        },
      },
    },
  });

  if (!course) {
    return null;
  }

  return {
    ...course,
    lessons: course.lessons.map((lesson) => ({
      ...lesson,
      progress: lesson.users[0]?.progress,
    })),
    isMember: course.users.length > 0,
  };
};

export type CourseView = NonNullable<Prisma.PromiseReturnType<typeof getCourse>>;
