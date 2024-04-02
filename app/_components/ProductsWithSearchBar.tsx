'use client';
import SearchBar from '@/app/_components/SearchBar';
import ClientProductCards from '@/app/_components/ClientProductCards';
import { SanityDocument } from 'next-sanity';
import { useState, ChangeEvent } from 'react';

export default function ProductsWithSearchBar({
  products,
}: {
  products: (SanityProduct & SanityDocument)[];
}) {
  const [searchResult, setSearchResult] = useState<string>('');
  const handleUpdateSearchResult = function (e: ChangeEvent<HTMLInputElement>) {
    setSearchResult(e.target.value);
  };

  return (
    <>
      <SearchBar changeEventHanlder={handleUpdateSearchResult} />

      <ClientProductCards
        products={products.filter((product) => {
          return product.title
            .toLowerCase()
            .includes(searchResult.toLowerCase());
        })}
      />
    </>
  );
}
