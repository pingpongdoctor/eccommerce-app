'use client';
import SearchBar from '@/app/_components/SearchBar';
import ProductCardsClientComponent from '@/app/_components/ProductCardsClientComponent';
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
      <SearchBar
        searchBarClassname="absolute left-0 right-0 top-16"
        changeEventHanlder={handleUpdateSearchResult}
      />

      <ProductCardsClientComponent
        products={products.filter((product) => {
          return product.title
            .toLowerCase()
            .includes(searchResult.toLowerCase());
        })}
      />
    </>
  );
}
