import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCourse } from './course.query';

export default async function CoursePage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const session = await getSession();
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
        <Card>
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {course.lessons.map((lesson) => (
              <Link
                href={`/courses/${course.id}/lessons/${lesson.id}`}
                className="p-2 border flex items-center border-border shadow-sm rounded-md hover:bg-accent"
                key={lesson.id}
              >
                <Typography variant="small" as="span">
                  {lesson.name}
                </Typography>
                <Badge className="ml-auto">{lesson.state}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
