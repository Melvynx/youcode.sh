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
import { Textarea } from '@/components/ui/textarea';
import { LessonState } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CourseFormSchema } from './course-form.schema';
import { editCourse } from './course.action';

export const CourseForm = (props: { course: CourseFormSchema | undefined }) => {
  const params = useParams();
  const courseId = String(params?.courseId);
  const router = useRouter();
  const form = useZodForm({
    schema: CourseFormSchema,
    defaultValues: props.course,
  });

  if (!courseId) {
    return null;
  }

  console.log(props, LessonState);

  return (
    <Form
      form={form}
      className="flex flex-col gap-4"
      onSubmit={async (values) => {
        const { data, serverError } = await editCourse({
          id: courseId,
          data: values,
        });

        if (serverError) {
          toast.error(serverError);
          return;
        }

        router.push(`/admin/courses/${data?.id}`);
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
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input type="url" placeholder="https://imgur.com/111111" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="presentation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Presentation</FormLabel>
            <FormControl>
              <Textarea placeholder="My beautiful course... join it!" {...field} />
            </FormControl>
            <FormMessage />
            <FormDescription>Markdown supported.</FormDescription>
          </FormItem>
        )}
      />
      <Button type="submit">Save</Button>
    </Form>
  );
};
