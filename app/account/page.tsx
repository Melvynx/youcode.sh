import { getRequiredAuthSession } from '@/auth/next-auth';
import { LogoutButton } from '@/components/features/auth/LogoutButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default async function page() {
  const session = await getRequiredAuthSession();
  return (
    <Card className="max-w-lg m-auto">
      <CardHeader className="flex items-center flex-row space-y-0 gap-2">
        <Avatar>
          <AvatarFallback>
            {session.user.email ? session?.user.email.slice(0, 2) : '??'}
          </AvatarFallback>
          {session.user.image && <AvatarImage src={session?.user.image} />}
        </Avatar>
        <div>
          <CardTitle className="mt-0">{session.user.email}</CardTitle>
          <CardDescription>{session.user.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Link
          href="/admin"
          className={buttonVariants({
            size: 'lg',
            className: 'w-full',
            variant: 'ghost',
          })}
        >
          Create courses
        </Link>
        <Link
          href="/account/edit"
          className={buttonVariants({
            size: 'lg',
            className: 'w-full',
            variant: 'ghost',
          })}
        >
          Edit profile
        </Link>
      </CardContent>
      <CardFooter className="justify-end flex">
        <LogoutButton />
      </CardFooter>
    </Card>
  );
}
