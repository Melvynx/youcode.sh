import { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="max-w-6xl mx-auto py-4 lg:py-6 px-4 xl:py-0">{children}</main>
  );
};
