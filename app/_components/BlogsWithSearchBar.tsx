'use client';
import SearchBar from '@/app/_components/SearchBar';
import { SanityDocument } from 'next-sanity';
import { useState, ChangeEvent } from 'react';
import BlogCard from './BlogCard';
import Link from 'next/link';

export default function ProductsWithSearchBar({
  blogs,
}: {
  blogs: BlogsWithDetailedAuthorData[];
}) {
  const [searchResult, setSearchResult] = useState<string>('');
  const handleUpdateSearchResult = function (e: ChangeEvent<HTMLInputElement>) {
    setSearchResult(e.target.value);
  };

  return (
    <>
      <SearchBar
        searchBarClassname="absolute left-0 right-0 top-16"
        changeEventHanlder={handleUpdateSearchResult}
      />

      {blogs.length > 0 &&
        blogs
          .filter((blog) => {
            return blog.title
              .toLowerCase()
              .includes(searchResult.toLowerCase());
          })
          .map((blog) => (
            <Link key={blog._id} href={`/blog/${blog.slug.current}`}>
              <BlogCard blog={blog} />
            </Link>
          ))}
    </>
  );
}
