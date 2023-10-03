'use client';

import Editor from '@/components/features/mdx/MdxEditor';
import { useDebounceFn } from '@/hooks/useDebounceFn';
import { useEffect, useRef } from 'react';
import { editLessonContent } from './lesson.action';

export const LessonEditorAutoSave = ({
  markdown,
  lessonId,
}: {
  markdown: string;
  lessonId: string;
}) => {
  const lastSavedRef = useRef<string>();
  const currentMdRef = useRef<string>();
  const onChange = useDebounceFn((md: string) => {
    lastSavedRef.current = md;
    editLessonContent(lessonId, md);
  }, 1000);

  // if the user leave the page, show a popoup only if the content has changed
  useEffect(() => {
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      if (lastSavedRef.current !== currentMdRef.current) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', beforeUnloadHandler);

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, []);

  return (
    <div className="w-full">
      <Editor
        className="w-full"
        markdown={markdown}
        onChange={(s) => {
          currentMdRef.current = s;
          onChange(s);
        }}
      />
    </div>
  );
};
