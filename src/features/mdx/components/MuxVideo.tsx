'use client';

import MuxPlayer from '@mux/mux-player-react';
import { z } from 'zod';
import { withTypeSafeProps } from '../utils/withTypeSafeProps';

const PropsSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
});

const MuxVideo = ({ id, title }: z.infer<typeof PropsSchema>) => {
  return (
    <MuxPlayer src={`https://stream.mux.com/${id}.m3u8`} title={String(title)} />
  );
};

export default withTypeSafeProps(MuxVideo, PropsSchema);
