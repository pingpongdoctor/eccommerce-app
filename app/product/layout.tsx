import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products Page',
  description: 'This is the products page',
};

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
