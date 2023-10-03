import { getRequiredAuthSession } from '@/auth/next-auth';
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { CourseCard } from './CourseCard';
import { getCourses } from './courses.query';

export default async function CoursePage() {
  const session = await getRequiredAuthSession();

  const courses = await getCourses(session.user.id);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Your courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => {
            return <CourseCard key={course.id} course={course} />;
          })}
        </div>
      </LayoutContent>
    </Layout>
  );
}
