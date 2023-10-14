import MuxVideo from '@/components/features/mdx/components/MuxVideo';
import { ButtonWithLoadingState } from '@/components/rsc/ButtonWithLoadingState';
import { Card } from '@/components/ui/card';
import { Progress } from '@prisma/client';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { completLesson } from './lesson-client.action';

export const Course = async ({
  content,
  progress,
  lessonId,
}: {
  content: string;
  progress: Progress;
  lessonId: string;
}) => {
  return (
    <Card className="w-full h-full px-4 xl:px-0 overflow-y-auto py-4 xl:py-8">
      <article className="prose dark:prose-invert max-w-2xl m-auto">
        <MDXRemote
          components={{
            MuxVideo: MuxVideo,
          }}
          source={content}
        />
      </article>
      <div className="mt-4 flex flex-row-reverse max-w-2xl m-auto">
        <form>
          <ButtonWithLoadingState
            formAction={async () => {
              'use server';

              await completLesson({
                lessonId: lessonId,
              });
            }}
            size="lg"
          >
            Completed
          </ButtonWithLoadingState>
        </form>
      </div>
    </Card>
  );
};
