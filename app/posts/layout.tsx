import type { Metadata } from "next";
import { draftMode } from "next/headers";
import VisualEditing from "../_components/VisualEditing";

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
  return (
    <div>
      {children}
      {draftMode().isEnabled && <VisualEditing />}
    </div>
  );
}
