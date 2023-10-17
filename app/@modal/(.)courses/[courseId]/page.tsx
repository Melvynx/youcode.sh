import { getAuthSession } from '@/auth/next-auth';
import { notFound } from 'next/navigation';
import { Course } from '../../../courses/[courseId]/Course';
import { getCourse } from '../../../courses/[courseId]/course.query';
import { CourseModal } from './CourseModal';

export default async function Page({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
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
