import { LessonState } from '@prisma/client';
import { z } from 'zod';

export const LessonFormSchema = z.object({
  name: z.string(),
  state: z.nativeEnum(LessonState),
});

export type LessonFormSchema = z.infer<typeof LessonFormSchema>;
