import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Products",
  },
  description: "This page shows products",
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
