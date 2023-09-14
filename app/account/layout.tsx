import { getAuthSession } from '@/auth/next-auth';
import { NotLoggedIn } from '@/components/features/errors/NotLoggedIn';
import { Layout } from '@/components/features/layout/Layout';
import { PropsWithChildren } from 'react';

export default async function layout({ children }: PropsWithChildren) {
  const session = await getAuthSession();

  if (!session?.user) {
    return <NotLoggedIn />;
  }

  return <Layout>{children}</Layout>;
}
