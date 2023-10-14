'use client';

import { cn } from '@/components/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Progress } from '@prisma/client';
import {
  CheckCircle,
  ChevronLeft,
  Circle,
  CircleDashed,
  PanelLeftClose,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  useLessonNavigation,
  useLessonNavigationState,
} from './LessonsNavigationStore';
import { LessonsType } from './lesson.query';

const getIconByProgress = ({ progress }: { progress?: Progress }) => {
  switch (progress) {
    case 'COMPLETED':
      return CheckCircle;
    case 'IN_PROGRESS':
      return Circle;
    default:
      return CircleDashed;
  }
};

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
    const Icon = getIconByProgress({ progress: lesson.progress });
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
        <CardHeader className="flex flex-row">
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
          <Button onClick={() => setState('CLOSED')} size="sm" variant="outline">
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
      <SheetContent>
        <SheetHeader>
          <Link
            href={`/courses/${courseId}`}
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
            })}
          >
            <ChevronLeft size={16} />
          </Link>
          <SheetTitle>Lessons</SheetTitle>
          <Button onClick={() => setState('CLOSED')} size="sm" variant="outline">
            <PanelLeftClose size={16} />
          </Button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
