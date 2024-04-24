import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beta Page',
  description: 'This is the beta page',
};

export default function BetaPageLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
