import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'This is the shopping cart page',
};

export default function ShoppingCartLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div>{children}</div>;
}
