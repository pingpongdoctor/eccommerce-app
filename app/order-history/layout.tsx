import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order History Page',
  description: 'This is the order history page',
};

export default function OrderHistoryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div>{children}</div>;
}
