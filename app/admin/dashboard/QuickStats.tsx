import { getAuthSession } from '@/auth/next-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/Typography';
import { prisma } from '@/db/prisma';

export const QuickStats = async () => {
  const session = await getAuthSession();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const courses = await prisma.course.count({
    where: {
      creatorId: userId,
    },
  });

  const students = await prisma.courseOnUser.count({
    where: {
      course: {
        creatorId: userId,
      },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick stats</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          <li className="flex items-center justify-between">
            <Typography as="span" variant="muted">
              Students
            </Typography>
            <Typography as="span" variant="base">
              {students}
            </Typography>
          </li>

          <li className="flex items-center justify-between">
            <Typography as="span" variant="muted">
              Courses
            </Typography>
            <Typography as="span" variant="base">
              {courses}
            </Typography>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
