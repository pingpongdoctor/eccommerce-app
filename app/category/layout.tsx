import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'This page shows all categories',
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full">{children}</div>;
}
