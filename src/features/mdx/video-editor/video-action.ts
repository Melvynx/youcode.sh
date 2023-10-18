'use server';

import Video from '@/lib/mux';
import { prisma } from '@/lib/prisma';
import { authenticatedAction } from '@/lib/safe-actions';
import { z } from 'zod';

export const createUpload = async () => {
  const directUpload = await Video.Uploads.create({
    // In production, you should update this value to something like
    // cors_origin: 'https://your-app.com',
    // to restrict uploads to only be allowed from your application.
    cors_origin: '*',
    new_asset_settings: {
      playback_policy: 'public',
    },
  });

  return {
    url: directUpload.url,
    id: directUpload.id,
  };
};

export const saveVideoToDb = authenticatedAction(
  z.object({
    title: z.string(),
    uploadId: z.string(),
  }),
  async ({ title, uploadId }, { userId }) => {
    const upload = await Video.Uploads.get(uploadId);
    const assetId = upload.asset_id;

    if (!assetId) {
      return;
    }

    await prisma.video.create({
      data: {
        title,
        userId,
        assetId,
      },
    });

    const asset = await Video.Assets.update(assetId, { passthrough: title });

    // create playback id
    const playbackId = await Video.Assets.createPlaybackId(asset.id, {
      policy: 'public',
    });

    return playbackId.id;
  }
);
