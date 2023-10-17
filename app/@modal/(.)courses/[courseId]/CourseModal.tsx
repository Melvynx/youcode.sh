'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { CourseView } from '../../../courses/[courseId]/course.query';

export const CourseModal = ({
  course,
  children,
}: PropsWithChildren<{ course: CourseView }>) => {
  const router = useRouter();
  const pathname = usePathname();

  const isCoursePage = pathname?.split('/').filter(Boolean).length === 2;
  console.log({ pathname, isCoursePage });

  return (
    <Dialog
      open={isCoursePage}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="max-h-screen overflow-auto max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>{course.name}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
