import { SanityDocument, QueryParams } from "next-sanity";
import Post from "@/app/_components/Post";
import { loadQuery } from "@/sanity/lib/store";
import { POST_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import { draftMode } from "next/headers";
import PostPreview from "@/app/_components/PostPreview";
import { client } from "@/sanity/lib/client";

export async function generateStaticParams() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function PostPage({ params }: { params: QueryParams }) {
  const initial = await loadQuery<SanityDocument>(POST_QUERY, params, {
    perspective: draftMode().isEnabled ? "previewDrafts" : "published",
  });

  return draftMode().isEnabled ? (
    <PostPreview initial={initial} params={params} />
  ) : (
    <Post post={initial.data} />
  );
}
