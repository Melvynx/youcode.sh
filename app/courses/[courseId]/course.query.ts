import { prisma } from '@/db/prisma';

export const getCourse = (courseId: string, userId = 'error') => {
  return prisma.course.findUnique({
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
      lessons: {
        select: {
          name: true,
          rank: true,
          id: true,
          state: true,
          users: {
            where: {
              id: userId,
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
};
