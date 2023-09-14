import { env } from '@/env.mjs';
import Link from 'next/link';
import { Typography } from '../ui/Typography';

export const PromotionBanner = () => {
  if (env.NODE_ENV !== 'production') {
    // return null;
  }

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] h-16 flex items-center justify-center from-blue-400 via-purple-600 to-blue-600">
      <Typography variant="h3" className="text-center text-white">
        YouCode is the plateforme YOU will build with{' '}
        <Link className="underline" href="https://codelynx.dev/nextreact">
          NextReact !
        </Link>
      </Typography>
    </div>
  );
};
