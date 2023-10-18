import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { CourseCardPlaceholder } from './CourseCardPlaceholder';

export default function loading() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Your courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => {
            return <CourseCardPlaceholder key={i} />;
          })}
        </div>
      </LayoutContent>
    </Layout>
  );
}
