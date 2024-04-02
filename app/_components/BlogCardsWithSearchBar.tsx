'use client';
import SearchBar from '@/app/_components/SearchBar';
import { useState, ChangeEvent } from 'react';
import BlogCardsClientComponent from './BlogCardsClientComponent';

export default function BlogCardsWithSearchBar({
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
      <SearchBar changeEventHanlder={handleUpdateSearchResult} />

      <BlogCardsClientComponent
        blogs={blogs.filter((blog) => {
          return (
            blog.title.toLowerCase().includes(searchResult.toLowerCase()) ||
            blog.authorData.name
              .toLowerCase()
              .includes(searchResult.toLowerCase())
          );
        })}
      />
    </>
  );
}
