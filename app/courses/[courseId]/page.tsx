import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { getAuthSession } from '@/lib/next-auth';
import { notFound } from 'next/navigation';
import { Course } from './Course';
import { getCourse } from './course.query';

export default async function CoursePage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const session = await getAuthSession();
  console.log('FUCK YOU NOT INTERCEPTING', params);
  const course = await getCourse(params.courseId, session?.user.id);

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{course.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Course course={course} />
      </LayoutContent>
    </Layout>
  );
}
