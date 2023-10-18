'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ChevronLeft, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  useLessonNavigation,
  useLessonNavigationState,
} from './LessonsNavigationStore';
import { getIconByProgress } from './getIconByProgress';
import type { LessonsType } from './lesson.query';

export const LessonsNavigationMenu = ({
  lessons,
  courseId,
}: {
  lessons: LessonsType;
  courseId: string;
}) => {
  console.log({ lessons });
  const state = useLessonNavigationState();
  const setState = useLessonNavigation((s) => s.setState);
  const params = useParams();

  const currentLessonId = params?.lessonId;

  const lessonsJsx = lessons.map((lesson) => {
    const Icon = getIconByProgress(lesson.progress);
    const isCurrent = lesson.id === currentLessonId;
    return (
      <Link
        key={lesson.id}
        href={`/courses/${courseId}/lessons/${lesson.id}`}
        style={{ minWidth: 250 }}
        className="overflow-y-auto"
      >
        <Card
          className={cn(
            'border-none hover:bg-primary/10 transition-colors cursor-pointer px-4 py-3 flex items-center gap-2 ',
            {
              'bg-primary/5': isCurrent,
            }
          )}
        >
          <Icon size={16} />
          <CardTitle>{lesson.name}</CardTitle>
        </Card>
      </Link>
    );
  });

  if (state === 'STICKY') {
    return (
      <Card>
        <CardHeader className="flex flex-row  items-center space-y-0">
          <Link
            href={`/courses/${courseId}`}
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
            })}
          >
            <ChevronLeft size={16} />
          </Link>
          <CardTitle>Lessons</CardTitle>
          <Button
            onClick={() => setState('CLOSED')}
            size="sm"
            variant="outline"
            className="ml-auto"
          >
            <PanelLeftClose size={16} />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">{lessonsJsx}</CardContent>
      </Card>
    );
  }

  return (
    <Sheet
      open={state === 'OPEN'}
      onOpenChange={(open) => {
        if (!open) {
          setState('CLOSED');
        }
      }}
    >
      <div className="absolute top-4 lg:top-8 lg:left-8 left-4">
        <Link
          href={`/courses/${courseId}`}
          className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
          })}
        >
          <ChevronLeft size={16} />
        </Link>
        <Button onClick={() => setState('OPEN')} size="sm" variant="outline">
          <Menu size={16} />
        </Button>
      </div>
      <SheetContent side="left" style={{ zIndex: 150 }}>
        <SheetHeader>
          <div className="w-full flex gap-4">
            <Link
              href={`/courses/${courseId}`}
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <ChevronLeft size={16} />
              Back
            </Link>
            <Button
              className=" hidden md:flex"
              onClick={() => setState('STICKY')}
              size="sm"
              variant="outline"
            >
              <PanelLeftOpen size={16} />
            </Button>
          </div>
          <SheetTitle>Lessons</SheetTitle>
          {lessonsJsx}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
