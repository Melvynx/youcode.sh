'use client';

import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loading';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

export const LoginButton = () => {
  const login = useMutation({ mutationFn: async () => signIn() });
  return (
    <Button
      size="sm"
      onClick={() => {
        login.mutate();
      }}
    >
      {login.isPending ? <Loader className="mr-2 h-4 w-4" /> : null}
      Login
    </Button>
  );
};
