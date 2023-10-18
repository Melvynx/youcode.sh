'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useMediaQuery } from 'usehooks-ts';

export const LessonNavigationMenuPlaceholder = () => {
  const isMedium = useMediaQuery('(min-width: 768px)');

  if (!isMedium) return;

  return (
    <Card style={{ minWidth: 240 }}>
      <CardHeader className="flex flex-row  gap-4 items-center space-y-0">
        <Skeleton className="h-9 w-10" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-10" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton className="h-9 w-full" key={i} />
        ))}
      </CardContent>
    </Card>
  );
};
