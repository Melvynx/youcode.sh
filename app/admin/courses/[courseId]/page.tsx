import { getAuthSession } from '@/auth/next-auth';
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { cn } from '@/components/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader } from '@/components/ui/loading';
import { prisma } from '@/db/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CourseUsers } from './CourseUsers';

export default async function page({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const session = await getAuthSession();

  const course = await prisma.course.findFirst({
    where: {
      id: params.courseId,
      creatorId: session?.user.id ?? 'error',
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          users: true,
          lessons: true,
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Course · {course.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex items-start gap-4">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Loader />}>
              <CourseUsers courseId={params.courseId} />
            </Suspense>
          </CardContent>
        </Card>
        <Card className="flex-[1]">
          <CardHeader>
            <CardTitle>Informations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>
                <b>{course._count.users}</b> users
              </li>
              <li>
                <b>{course._count.lessons}</b> lessons
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col gap-1">
            <Link
              href={`/admin/courses/${course.id}/lessons`}
              className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
            >
              Edit lessons
            </Link>

            <Link
              href={`/admin/courses/${course.id}/edit`}
              className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
            >
              Edit details
            </Link>
          </CardFooter>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
