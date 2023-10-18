import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { CourseForm } from './CourseForm';

export default async function page({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const isNew = params.courseId === 'new';
  const course = isNew
    ? undefined
    : await prisma.course.findFirstOrThrow({
        where: {
          id: params.courseId,
        },
      });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Course details</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardHeader>
            <CardTitle>
              {isNew ? 'New' : 'Edit'} {course?.name ? `· ${course.name}` : ''}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CourseForm course={course} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
