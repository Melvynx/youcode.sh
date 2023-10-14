import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Suspense } from 'react';
import { QuickStats } from './dashboard/QuickStats';

export default function AdminPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Admin</LayoutTitle>
        <LayoutDescription>Dashboard</LayoutDescription>
      </LayoutHeader>
      <LayoutActions>
        <Link href={`/admin/courses`} className={buttonVariants()}>
          Courses
        </Link>
      </LayoutActions>
      <LayoutContent>
        <Suspense
          fallback={
            <Card>
              <CardHeader>
                <Skeleton className="w-full h-8" />
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
              </CardContent>
            </Card>
          }
        >
          <QuickStats />
        </Suspense>
      </LayoutContent>
    </Layout>
  );
}
