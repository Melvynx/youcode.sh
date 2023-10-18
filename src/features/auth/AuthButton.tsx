import { getAuthSession } from '@/lib/next-auth';
import { LoggedInButton } from './LoggedInButton';
import { LoginButton } from './LoginButton';

export const AuthButton = async () => {
  const session = await getAuthSession();

  if (session?.user) {
    return <LoggedInButton user={session?.user} />;
  }

  return <LoginButton />;
};
