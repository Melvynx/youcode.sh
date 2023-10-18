import { prisma } from '@/lib/prisma';

export const getExploreCourses = async () => {
  const courses = await prisma.course.findMany({
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
  });

  return courses;
};
