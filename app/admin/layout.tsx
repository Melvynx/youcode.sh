import { Breadcrumb } from '@/components/layout/Breadcrumb';
import type { PropsWithChildren } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col">
      <div className="m-4">
        <Breadcrumb />
      </div>
      {children}
    </div>
  );
}
