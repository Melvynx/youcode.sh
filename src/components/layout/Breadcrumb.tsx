'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { Typography } from '../ui/Typography';

export const Breadcrumb = () => {
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  const paths = pathname.split('/');

  return (
    <div className="flex items-center gap-1">
      {paths.map((path, i) => {
        const needChevron = i !== paths.length - 1 && i !== 0;

        const url = paths.slice(0, i + 1).join('/');

        return (
          <Fragment key={i}>
            <Typography
              className="hover:underline"
              as={Link}
              href={url}
              variant="small"
            >
              {path}
            </Typography>
            {needChevron && <ChevronRight size={12} />}
          </Fragment>
        );
      })}
    </div>
  );
};
