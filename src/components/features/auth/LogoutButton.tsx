'use client';

import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loading';
import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export const LogoutButton = () => {
  const logout = useMutation(() => signOut());
  return (
    <Button
      size="sm"
      onClick={() => {
        logout.mutate();
      }}
    >
      {logout.isLoading ? (
        <Loader className="mr-2 h-4 w-4" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      Logout
    </Button>
  );
};
