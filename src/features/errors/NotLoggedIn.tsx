import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signIn } from 'next-auth/react';

export const NotLoggedIn = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>You are not logged in.</CardTitle>
        <CardDescription>Please log in to view this page.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant="secondary"
          onClick={() => {
            void signIn();
          }}
        >
          Log In
        </Button>
      </CardFooter>
    </Card>
  );
};
