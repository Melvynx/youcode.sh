import { z } from 'zod';

export const CourseFormSchema = z.object({
  image: z.string().url(),
  name: z.string(),
  presentation: z.string(),
});

export type CourseFormSchema = z.infer<typeof CourseFormSchema>;
