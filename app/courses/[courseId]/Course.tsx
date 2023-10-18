import { Typography } from '@/components/ui/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { JoinCourseButton } from './JoinCourseButton';
import { CourseView } from './course.query';
import { getIconByProgress } from './lessons/[lessonId]/getIconByProgress';

export const Course = ({ course }: { course: CourseView }) => {
  return (
    <div className="flex gap-4 lg:flex-row flex-col">
      <Card className="flex-[2]">
        <CardHeader>
          <CardTitle className="inline-flex gap-1 items-center">
            <Avatar>
              <AvatarFallback>{course.creator.name?.[0] ?? '?'}</AvatarFallback>
              {course.creator.image ? (
                <AvatarImage src={course.creator.image} />
              ) : null}
            </Avatar>
            <span>{course.creator.name ?? 'Unknown'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <MDXRemote source={course.presentation} />
        </CardContent>
        {course.isMember ? null : (
          <CardFooter>
            <JoinCourseButton courseId={course.id} />
          </CardFooter>
        )}
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Lessons</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {course.lessons.map((lesson) => {
            const Icon = getIconByProgress(lesson.progress);
            return (
              <Link
                href={`/courses/${course.id}/lessons/${lesson.id}`}
                className="p-2 border flex items-center border-border shadow-sm rounded-md hover:bg-accent gap-2"
                key={lesson.id}
              >
                <Icon size={16} />
                <Typography variant="base" as="span">
                  {lesson.name}
                </Typography>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
