'use client'; // Error components must be Client Components

import { LoginButton } from '@/components/features/auth/LoginButton';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Error() {
  return (
    <Card className="max-w-md m-auto mt-4 bg-destructive/20 border-destructive/50">
      <CardHeader>
        <CardTitle>Your not authenticated</CardTitle>
        <CardDescription>please login to access this page</CardDescription>
      </CardHeader>
      <CardFooter>
        <LoginButton />
      </CardFooter>
    </Card>
  );
}
