import { NotLoggedIn } from '@/features/errors/NotLoggedIn';
import { Layout } from '@/features/layout/Layout';
import { getAuthSession } from '@/lib/next-auth';
import { PropsWithChildren } from 'react';

export default async function layout({ children }: PropsWithChildren) {
  const session = await getAuthSession();

  if (!session?.user) {
    return <NotLoggedIn />;
  }

  return <Layout>{children}</Layout>;
}
