import { Layout, LayoutContent, LayoutHeader } from '@/components/layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function loading() {
  return (
    <Layout>
      <LayoutHeader>
        <Skeleton className="h-9 w-28" />
      </LayoutHeader>
      <LayoutContent>
        <div className="flex gap-4 lg:flex-row flex-col">
          <Card className="flex-[2]">
            <CardHeader>
              <Skeleton className="h-9 w-28" />
            </CardHeader>
            <CardContent className="prose dark:prose-invert">
              <article className="prose mt-4 dark:prose-invert flex-col gap-4 flex max-w-2xl m-auto">
                <Skeleton className="h-9 w-28" />
                <Skeleton className="h-7 w-full" />
                <Skeleton className="h-7 w-1/2" />
                <Skeleton className="h-7 w-1/3" />
                <Skeleton className="h-7 w-full" />
                <Skeleton className="h-20 w-full" />
              </article>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Lessons</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton className="h-9 w-full" key={i} />
              ))}
            </CardContent>
          </Card>
        </div>
      </LayoutContent>
    </Layout>
  );
}
