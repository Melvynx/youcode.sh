'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LessonState } from '@prisma/client';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { LessonFormSchema } from './lesson-form.schema';
import { editLesson } from './lesson.action';

export const LessonForm = (props: { name: string; state: LessonState }) => {
  const params = useParams();
  const lessonId = String(params?.lessonId);
  const form = useZodForm({
    schema: LessonFormSchema,
    defaultValues: props,
  });

  if (!lessonId) {
    return null;
  }

  console.log(props, LessonState);

  return (
    <Form
      form={form}
      className="flex flex-col gap-2"
      onSubmit={async (values) => {
        await editLesson(lessonId, values);
        toast.success('Lesson updated');
      }}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="My first lesson !" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.keys(LessonState).map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              HIDDEN = nobody can see the lesson. PUBLISHED = only students can see
              the lesson. PUBLIC = everyone can see the lesson.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Save</Button>
    </Form>
  );
};
