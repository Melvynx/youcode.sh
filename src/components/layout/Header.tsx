import { SiteConfig } from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '../ThemeToggle';
import { AuthButton } from '../features/auth/AuthButton';
import { Typography } from '../ui/Typography';

export function Header() {
  return (
    <header
      className="bg-background sticky top-0 w-full border-b"
      style={{
        zIndex: 99999,
      }}
    >
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-2">
          <Image src="/images/you-code.svg" width={50} height={35} alt="app logo" />
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
          {SiteConfig.nav.map((navItem) => (
            <Link href={navItem.href} key={navItem.href} className="hover:underline">
              {navItem.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <AuthButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
