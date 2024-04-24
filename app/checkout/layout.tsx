import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Check Out Page',
  description: 'This is the check out page',
};

export default function CheckOutLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
