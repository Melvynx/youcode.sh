import { getRequiredAuthSession } from '@/lib/next-auth';
import { prisma } from '@/lib/prisma';
import { NewUserCharts } from './NewUserCharts';

export const NewUserStats = async () => {
  const session = await getRequiredAuthSession();

  const newUsers = await prisma.courseOnUser.findMany({
    where: {
      course: {
        creatorId: session.user.id,
      },
      createdAt: {
        // previous 30 days
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    select: {
      createdAt: true,
      canceledAt: true,
      id: true,
    },
  });

  // create an array of 30 days, for each days, count the number of new users
  // and the number of users who canceled
  const data = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(new Date().setDate(new Date().getDate() - i));
    const dateWithoutTime = new Date(date.setHours(0, 0, 0, 0));
    const newUsersCount = newUsers.filter((user) => {
      const userDateWithoutTime = new Date(user.createdAt.setHours(0, 0, 0, 0));
      return userDateWithoutTime.getTime() === dateWithoutTime.getTime();
    }).length;

    const canceledUsersCount = newUsers.filter((user) => {
      if (!user.canceledAt) {
        return false;
      }
      const userCanceledDateWithoutTime = new Date(
        user.canceledAt.setHours(0, 0, 0, 0)
      );
      return userCanceledDateWithoutTime.getTime() === dateWithoutTime.getTime();
    }).length;

    return {
      date: date.toDateString(),
      newUsersCount,
      canceledUsersCount,
    };
  }).reverse();

  return <NewUserCharts data={data} />;
};
