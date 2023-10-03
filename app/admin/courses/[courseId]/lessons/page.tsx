import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/db/prisma';
import Link from 'next/link';

export default async function page({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const course = await prisma.course.findFirstOrThrow({
    where: {
      id: params.courseId,
    },
    select: {
      id: true,
      name: true,

      lessons: {
        select: {
          id: true,
          name: true,
          state: true,
        },
      },
    },
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{course.name} · Lessons</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {course.lessons.map((lesson) => (
              <Link
                href={`/admin/courses/${course.id}/lessons/${lesson.id}`}
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
