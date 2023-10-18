'use client';

import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { joinCourseAction } from './course.action';

export const JoinCourseButton = ({ courseId }: { courseId: string }) => {
  const router = useRouter();
  const joinMutation = useMutation({
    mutationFn: async () => {
      const { data, serverError } = await joinCourseAction({ courseId });
      if (data) {
        router.push(data);
      }
      if (serverError) {
        toast.error(serverError);
      }
    },
  });
  return (
    <Button disabled={joinMutation.isPending} onClick={() => joinMutation.mutate()}>
      Join
    </Button>
  );
};
