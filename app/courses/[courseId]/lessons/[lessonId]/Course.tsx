import MuxVideo from '@/components/features/mdx/components/MuxVideo';
import { Card } from '@/components/ui/card';
import { Progress } from '@prisma/client';
import { MDXRemote } from 'next-mdx-remote/rsc';

export const Course = async ({
  content,
  progress,
}: {
  content: string;
  progress: Progress;
}) => {
  console.log({ content });
  return (
    <Card className="w-full h-full overflow-y-auto">
      <article className="prose dark:prose-invert max-w-2xl m-auto mt-4">
        <MDXRemote
          components={{
            MuxVideo: MuxVideo,
          }}
          source={content}
        />
      </article>
    </Card>
  );
};
