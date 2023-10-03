'use client';

import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import { LessonState } from '@prisma/client';
import { z } from 'zod';

const FormSchema = z.object({
  name: z.string(),
  state: z.nativeEnum(LessonState),
});

export const LessonForm = (props: { name: string; state: LessonState }) => {
  return (
    <AutoForm
      formSchema={FormSchema}
      fieldConfig={{
        state: {
          fieldType: 'select',
        },
      }}
      values={props}
    >
      <AutoFormSubmit>Save</AutoFormSubmit>
    </AutoForm>
  );
};
