import Editor from '@/components/features/mdx/MdxEditor';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <div className="m-auto max-w-2xl mt-4">
      <Suspense fallback={null}>
        <Editor markdown="# Title" />
      </Suspense>
    </div>
  );
}
