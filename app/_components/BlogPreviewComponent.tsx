'use client';
import { BLOG_QUERY } from '@/sanity/lib/queries';
import { QueryResponseInitial, useQuery } from '@sanity/react-loader';
import { QueryParams, SanityDocument } from 'next-sanity';
import BlogClientComponent from './BlogClientComponent';

export default function BlogPreviewComponent({
  initial,
  params,
}: {
  initial: QueryResponseInitial<SanityBlog & SanityDocument>;
  params: QueryParams;
}) {
  const { data } = useQuery<(SanityBlog & SanityDocument) | null>(
    BLOG_QUERY,
    params,
    {
      initial,
    }
  );

  return data && <BlogClientComponent blog={data} />;
  return null;
}
