import { prisma } from '@/db/prisma';
import { User, columns } from './users/columns';
import { DataTable } from './users/data-table';

export const CourseUsers = async ({
  page,
  courseId,
}: {
  page: string;
  courseId: string;
}) => {
  const courseOnUsers = await prisma.courseOnUser.findMany({
    where: {
      courseId,
    },
    select: {
      canceledAt: true,
      id: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          email: true,
          image: true,
        },
      },
    },
    take: 10,
    skip: parseInt(page) * 10,
  });

  const data = courseOnUsers.map((u) => ({
    id: u.id,
    email: u.user.email,
    status: u.canceledAt ? 'cancelled' : 'active',
  })) as User[];

  return <DataTable columns={columns} data={data} />;
};
