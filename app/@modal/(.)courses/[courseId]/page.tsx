import { getAuthSession } from "@/lib/next-auth";
import { notFound } from "next/navigation";
import { Course } from "../../../courses/[courseId]/Course";
import { getCourse } from "../../../courses/[courseId]/course.query";
import { CourseModal } from "./CourseModal";

import type { PageParams } from "@/types/next";

export default async function Page(props: PageParams<{ courseId: string }>) {
  const params = await props.params;
  const session = await getAuthSession();
  const course = await getCourse(params.courseId, session?.user.id);

  if (!course) {
    notFound();
  }

  return (
    <CourseModal course={course}>
      <Course course={course} />
    </CourseModal>
  );
}
