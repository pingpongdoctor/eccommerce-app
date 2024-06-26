import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Page',
  description: 'This is the admin page',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
