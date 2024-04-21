'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ChangeEvent } from 'react';

interface Props {
  changeEventHanlder: (e: ChangeEvent<HTMLInputElement>) => void;
  searchBarClassname?: string;
  isBlackTheme?: boolean;
}

export default function SearchBar({
  changeEventHanlder,
  searchBarClassname,
  isBlackTheme = false,
}: Props) {
  return (
    <div
      className={`mb-8 px-4 md:px-8 lg:mb-12 lg:px-12 xl:mx-auto xl:max-w-7xl ${searchBarClassname}`}
    >
      <label
        htmlFor="search-bar"
        className="relative block w-full rounded-md border border-gray-400 shadow-sm focus-within:border-gray-500"
      >
        <input
          type="text"
          id="search-bar"
          className={`peer relative w-full rounded-md border-none border-transparent px-3 py-3 pl-12 text-gray-700 focus:outline-none focus:ring-0 ${
            isBlackTheme ? '' : 'placeholder-transparent'
          }`}
          placeholder="Search Here"
          onChange={changeEventHanlder}
        />

        <MagnifyingGlassIcon className="absolute start-3 top-3 h-auto w-6 text-gray-700" />

        {!isBlackTheme && (
          <span className="pointer-events-none absolute start-12 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-700">
            Search Here
          </span>
        )}
      </label>
    </div>
  );
}
