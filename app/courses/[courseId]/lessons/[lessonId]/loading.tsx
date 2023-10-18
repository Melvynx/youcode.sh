import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { LessonNavigationMenuPlaceholder } from './placehlder/LessonNavigationMenuPlaceholder';

export default function loading() {
  return (
    <div
      className="flex p-2 lg:p-4 gap-4 h-full relative"
      style={{
        height: `calc(100vh - var(--header-height) - 1px)`,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <LessonNavigationMenuPlaceholder />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Card className="w-full h-full px-4 xl:px-0 overflow-y-auto py-4 xl:py-8">
          <article className="prose mt-4 dark:prose-invert flex-col gap-4 flex max-w-2xl m-auto">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-1/2" />
            <Skeleton className="h-7 w-1/3" />
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-20 w-full" />
          </article>

          <div className="mt-4 flex flex-row-reverse max-w-2xl m-auto">
            <Skeleton className="h-9 w-20" />
          </div>
        </Card>
      </Suspense>
    </div>
  );
}
