import { ButtonWithLoadingState } from '@/components/rsc/ButtonWithLoadingState';
import { Card } from '@/components/ui/card';
import MuxVideo from '@/features/mdx/components/MuxVideo';
import type { Progress } from '@prisma/client';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';
import { handleLessonState } from './lesson-client.action';

export const Lesson = async ({
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
      <article className="prose mt-4 dark:prose-invert max-w-2xl m-auto">
        <MDXRemote
          components={{
            MuxVideo: MuxVideo,
          }}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypePrism],
            },
          }}
          source={content}
        />
      </article>

      <div className="mt-4 flex flex-row-reverse max-w-2xl m-auto">
        <form>
          <ButtonWithLoadingState
            formAction={async () => {
              'use server';

              await handleLessonState({
                lessonId: lessonId,
                state: progress === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED',
              });
            }}
            size="lg"
          >
            {progress === 'COMPLETED' ? 'Mark as in progress' : 'Completed'}
          </ButtonWithLoadingState>
        </form>
      </div>
    </Card>
  );
};
