import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { ButtonWithLoadingState } from '@/components/rsc/ButtonWithLoadingState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import { Lessons } from './Lessons';
import { newLessonAction } from './[lessonId]/lesson.action';

const getCourseLessons = async (courseId: string) => {
  return prisma.course.findFirstOrThrow({
    where: {
      id: courseId,
    },

    select: {
      id: true,
      name: true,

      lessons: {
        orderBy: {
          rank: 'asc',
        },
        select: {
          id: true,
          name: true,
          state: true,
          rank: true,
        },
      },
    },
  });
};

export type CourseLessons = Prisma.PromiseReturnType<
  typeof getCourseLessons
>['lessons'];

export default async function page({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const course = await getCourseLessons(params.courseId);

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
            <Lessons
              key={course.lessons.length}
              lessons={course.lessons}
              courseId={course.id}
            />
            <form>
              <ButtonWithLoadingState
                formAction={async () => {
                  'use server';
                  await newLessonAction({
                    courseId: course.id,
                  });
                }}
                variant="secondary"
              >
                New lesson
              </ButtonWithLoadingState>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
