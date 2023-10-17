import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { CourseCard } from '../courses/CourseCard';
import { getExploreCourses } from './explore.query';

export default async function CoursePage() {
  const courses = await getExploreCourses();

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
