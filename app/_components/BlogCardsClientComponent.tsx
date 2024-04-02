'use client';
import { SanityDocument } from 'next-sanity';
import Link from 'next/link';
import BlogCard from './BlogCard';

interface Props {
  blogs: BlogsWithDetailedAuthorData[];
}

export default function BlogCardsClientComponent({ blogs }: Props) {
  return (
    <div className="flex flex-wrap justify-start gap-8 gap-y-4 px-4 sm:gap-y-8 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
      {blogs.length > 0 &&
        blogs.map(
          (
            blog: SanityBlog &
              SanityDocument & {
                authorData: SanityAuthor & SanityDocument;
              } & { imageUrl: string }
          ) => (
            <Link
              className="block w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)] xl:w-[calc((100%-6rem)/4)]"
              key={blog._id}
              href={`/blog/${blog.slug.current}`}
            >
              <BlogCard
                blog={blog}
                blogCardClassname="w-full sm:w-full md:w-full lg:w-full xl:w-full md:aspect-[1/1.15]"
              />
            </Link>
          )
        )}
    </div>
  );
}
