import { TailwindIndicator } from '@/components/TailwindIndicator';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SiteConfig } from '@/config';
import { PromotionBanner } from '@/features/nextreact/PromotionBanner';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { PropsWithChildren, ReactNode } from 'react';
import { Providers } from './Providers';
import './code-theme.css';
import './globals.css';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({
  children,
  modal,
}: PropsWithChildren<{
  modal?: ReactNode;
}>) {
  return (
    <>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'h-full bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <PromotionBanner />
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
            {modal}
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </>
  );
}
