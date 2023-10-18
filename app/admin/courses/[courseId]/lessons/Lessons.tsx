'use client';

import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { saveLessonMove } from './[lessonId]/lesson.action';
import type { CourseLessons } from './page';

export const Lessons = ({
  lessons: defaultLessons,
  courseId,
}: {
  lessons: CourseLessons;
  courseId: string;
}) => {
  const [lessons, setLessons] = useState(defaultLessons);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    console.log('CALL ONE TIME');

    if (active.id !== over?.id) {
      // setLessons callback is called twice
      // I don't know why
      let calling = false;
      setLessons((items) => {
        if (calling) return items;
        calling = true;

        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        const newUpItem = newItems[newIndex - 1]?.rank;
        const newDownItem = newItems[newIndex + 1]?.rank;

        void saveLessonMove({
          upItemRank: newUpItem,
          downItemRank: newDownItem,
          lessonId: String(active.id),
        }).then(({ data }) => {
          if (!data) {
            setLessons(items);
            toast.error('An error occurred while moving the lesson');
          }
        });

        return newItems;
      });
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={lessons} strategy={verticalListSortingStrategy}>
          {lessons.map((lesson) => (
            <SortableItem courseId={courseId} lesson={lesson} key={lesson.id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

const SortableItem = ({
  courseId,
  lesson,
}: {
  courseId: string;
  lesson: CourseLessons[0];
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: lesson.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Link
      ref={setNodeRef}
      href={`/admin/courses/${courseId}/lessons/${lesson.id}`}
      className="p-2 border flex items-center border-border shadow-sm rounded-md hover:bg-accent"
      key={lesson.id}
      style={style}
      {...attributes}
    >
      <Typography variant="small" as="span">
        {lesson.name}
      </Typography>
      <Badge className="ml-auto">{lesson.state}</Badge>
      <div
        onClickCapture={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Button variant="ghost" className="cursor-move" size="sm" {...listeners}>
          <Menu size={12} />
        </Button>
      </div>
    </Link>
  );
};
