import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { CourseCardType } from './courses.query';

export const CourseCard = ({ course }: { course: CourseCardType[number] }) => {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="hover:bg-muted transition-colors">
        <CardHeader className="flex-row gap-4">
          <div className="flex flex-col gap-2">
            <CardTitle>{course.name}</CardTitle>
            <CardDescription>{course.presentation}</CardDescription>
          </div>
          {course.image ? (
            <img
              className="object-contain"
              src={course.image}
              width={100}
              height={100}
              alt="image"
            />
          ) : null}
        </CardHeader>
      </Card>
    </Link>
  );
};
