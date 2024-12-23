"use server";

import { prisma } from "@/lib/prisma";
import { authenticatedAction } from "@/lib/safe-actions";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CourseFormSchema } from "./course-form.schema";

export const editCourse = authenticatedAction(
  z.object({
    id: z.string(),
    data: CourseFormSchema,
  }),
  async ({ data, id }, { userId }) => {
    const updatedCourse = await prisma.course.update({
      where: {
        id: id,
        creatorId: userId,
      },
      data,
    });

    revalidatePath(`/admin/courses/${id}`);

    return updatedCourse;
  }
);

export const createCourse = authenticatedAction(
  CourseFormSchema,
  async (data, { userId }) => {
    const newCourse = await prisma.course.create({
      data: {
        ...data,
        creatorId: userId,
      },
    });

    revalidatePath(`/admin/courses/${newCourse.id}`);

    return newCourse;
  }
);
