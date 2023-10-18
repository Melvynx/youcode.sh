import { SiteConfig } from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '../ui/Typography';

export const Footer = () => {
  return (
    <footer className="border-t border-card w-full">
      <div className="max-w-3xl m-auto w-full py-4 px-2">
        <div className="flex flex-col lg:items-start lg:flex-row lg:justify-between">
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/images/you-code.svg"
              width={40}
              height={30}
              alt="app logo"
            />
            <Typography variant="base" as={Link} href="/">
              {SiteConfig.title}
            </Typography>
          </div>
          <div className="flex flex-col gap-2 items-end text-sm text-muted-foreground">
            <Link className="hover:underline" href="/legal/privacy">
              Privacy
            </Link>
            <Link className="hover:underline" href="/legal/cgv">
              CGV
            </Link>
            <Link className="hover:underline" href="/courses">
              Courses
            </Link>
            <Link className="hover:underline" href="/admin">
              Admin
            </Link>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <Typography variant="base" className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} YouCode
          </Typography>
        </div>
      </div>
    </footer>
  );
};
