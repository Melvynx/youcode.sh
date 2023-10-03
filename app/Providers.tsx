'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            <QueryClientProvider client={queryClient}>
              <Toaster />
              {children}
            </QueryClientProvider>
          </SessionProvider>
        </ThemeProvider>
      </DndProvider>
    </>
  );
};
