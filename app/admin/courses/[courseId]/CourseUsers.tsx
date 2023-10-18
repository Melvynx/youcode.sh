import { prisma } from '@/lib/prisma';
import type { User} from './users/columns';
import { columns } from './users/columns';
import { DataTable } from './users/data-table';

export const CourseUsers = async ({ courseId }: { courseId: string }) => {
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
  });

  const data = courseOnUsers.map((u) => ({
    id: u.user.id,
    email: u.user.email,
    status: u.canceledAt ? 'cancelled' : 'active',
  })) as User[];

  return <DataTable columns={columns} data={data} />;
};
