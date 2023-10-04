'use server';

import { getRequiredAuthSession } from '@/auth/next-auth';
import { prisma } from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { CourseFormSchema } from './course-form.schema';

export const editCourse = async (id: string, unsafeData: CourseFormSchema) => {
  const data = CourseFormSchema.parse(unsafeData);
  const session = await getRequiredAuthSession();

  const updatedCourse = await prisma.course.update({
    where: {
      id: id,
      creatorId: session.user.id,
    },
    data,
  });

  revalidatePath(`/admin/courses/${id}`);

  return updatedCourse;
};
