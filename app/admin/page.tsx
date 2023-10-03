import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Admin</LayoutTitle>
        <LayoutDescription>Create, update your courses.</LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <Link href={`/admin/courses`} className={buttonVariants()}>
          Courses
        </Link>
      </LayoutContent>
    </Layout>
  );
}
