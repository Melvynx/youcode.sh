'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader } from '@/components/ui/loading';
import { useMutation } from '@tanstack/react-query';
import { GraduationCap, LogOut, ShieldCheck, User2 } from 'lucide-react';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export const LoggedInButton = ({ user }: { user: Session['user'] }) => {
  const logout = useMutation({
    mutationFn: async () => signOut(),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarFallback>
              {user.email ? user.email.slice(0, 2) : '??'}
            </AvatarFallback>
            {user.image && <AvatarImage src={user.image} />}
          </Avatar>
          {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Accounts</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/account">
            <User2 className="mr-2 h-4 w-4" />
            My Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/admin">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Admin
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/courses">
            <GraduationCap className="mr-2 h-4 w-4" />
            Courses
          </Link>
        </DropdownMenuItem>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => logout.mutate()}>
            {logout.isPending ? (
              <Loader className="mr-2 h-4 w-4" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
