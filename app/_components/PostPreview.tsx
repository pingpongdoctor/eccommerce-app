"use client";

import { POST_QUERY } from "@/sanity/lib/queries";
import { QueryResponseInitial, useQuery } from "@sanity/react-loader";
import { QueryParams, SanityDocument } from "next-sanity";

import Post from "./Post";

export default function PostsPreview({
  initial,
  params,
}: {
  initial: QueryResponseInitial<SanityDocument>;
  params: QueryParams;
}) {
  const { data } = useQuery<SanityDocument | null>(POST_QUERY, params, {
    initial,
  });

  return data ? (
    <Post post={data} />
  ) : (
    <div className="bg-red-100">No post found</div>
  );
}
