import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs Page',
  description: 'This is the blogs page',
};

export default function BlogsLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
