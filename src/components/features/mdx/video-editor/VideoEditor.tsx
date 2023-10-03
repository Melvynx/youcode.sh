import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loading';
import { JsxEditorProps, useMdastNodeUpdater } from '@mdxeditor/editor';
import MuxPlayer from '@mux/mux-player-react';
import MuxUploader from '@mux/mux-uploader-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { createUpload, saveVideoToDb } from './video-action';

export const MuxVideoEditor = ({ mdastNode, descriptor }: JsxEditorProps) => {
  const updateMdastNode = useMdastNodeUpdater();
  const ref = useRef<HTMLDivElement>(null);

  const assetId = mdastNode?.attributes?.find(
    (attr) => attr.type === 'mdxJsxAttribute' && attr.name === 'id'
  )?.value;
  const title = mdastNode?.attributes?.find(
    (attr) => attr.type === 'mdxJsxAttribute' && attr.name === 'title'
  )?.value;
  const [uploaded, setUploaded] = useState(false);

  const { data } = useQuery({
    enabled: !Boolean(assetId),
    queryKey: ['video'],
    queryFn: () => createUpload(),
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const container = ref.current;

    if (!container) {
      return;
    }

    // get element with tag mux-uploader-file-select from container
    const shadowRoot = container.shadowRoot;

    console.log(shadowRoot);
    if (!shadowRoot) return;

    const muxUploaderDrop = shadowRoot.querySelector(
      'mux-uploader-drop'
    ) as HTMLDivElement;

    const muxSrText = shadowRoot.querySelector(
      'mux-uploader-sr-text'
    ) as HTMLDivElement;
    if (muxSrText) {
      muxSrText.style.display = 'none';
    }

    if (!muxUploaderDrop) return;

    muxUploaderDrop.style.display = 'flex';
    muxUploaderDrop.style.width = '100%';

    const secondShadowRoot = muxUploaderDrop.shadowRoot;
    if (!secondShadowRoot) return;

    for (const child of Array.from(muxUploaderDrop.children) as HTMLDivElement[]) {
      if (child.tagName === 'STYLE') continue;
      if (child.tagName === 'SLOT') continue;
      if (child.id === 'overlay') continue;
      child.style.display = 'flex';
    }
  }, [data]);

  const upload = useMutation({
    mutationFn: async ({ title, uploadId }: { title: string; uploadId: string }) => {
      const assetId = await saveVideoToDb({ title, uploadId });
      updateMdastNode({
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'id',
            value: assetId,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'title',
            value: title,
          },
        ],
      });
    },
  });

  if (!data && !assetId) {
    return <Loader />;
  }

  if (assetId) {
    return (
      <Card className="not-prose">
        <CardHeader>
          <CardTitle>{String(title)}</CardTitle>
        </CardHeader>
        <CardContent>
          <MuxPlayer
            style={{ marginTop: -84 }}
            src={`https://stream.mux.com/${assetId}.m3u8`}
            title={String(title)}
          />
        </CardContent>
      </Card>
    );
  }

  if (upload.isLoading || !data) {
    return (
      <Card className="not-prose">
        <CardHeader>
          <CardTitle style={{ margin: 0 }}>Loading...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const { url, id } = data;

  return (
    <Card className="not-prose">
      <CardHeader>
        <CardTitle style={{ margin: 0 }}>Drop a video here</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Submit');

            const formData = new FormData(e.target as HTMLFormElement);
            const title = formData.get('title') as string;

            upload.mutate({ uploadId: id, title });
          }}
        >
          <Input placeholder="Title" name="title" />
          <MuxUploader
            // className="h-14 block"
            endpoint={url}
            className="flex w-full flex-col"
            onSuccess={() => setUploaded(true)}
            ref={ref as any}
          ></MuxUploader>
          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
};
