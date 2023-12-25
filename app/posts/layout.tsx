import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Posts",
  },
  description: "This page shows posts",
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
