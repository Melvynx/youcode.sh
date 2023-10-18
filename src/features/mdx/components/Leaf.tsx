import { PropsWithChildren } from 'react';

export const Leaf = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};
