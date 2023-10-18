import { prisma } from '@/db/prisma';
import { Prisma } from '@prisma/client';

export const getCourses = async (userId: string) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
    select: {
      ownedCourses: {
        select: {
          id: true,
          course: {
            select: {
              name: true,
              presentation: true,
              image: true,
              id: true,
              creator: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return user.ownedCourses.map((ownedCourse) => ownedCourse.course);
};

export type CourseCardType = Prisma.PromiseReturnType<typeof getCourses>;
