'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ChangeEvent } from 'react';

interface Props {
  changeEventHanlder: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ changeEventHanlder }: Props) {
  return (
    <div className="absolute left-0 right-0 top-0 mb-8 px-4 md:px-8 lg:mb-12 lg:px-12 xl:mx-auto xl:max-w-7xl">
      <label
        htmlFor="search-bar"
        className="relative block w-full rounded-md border border-gray-400 shadow-sm focus-within:border-gray-500"
      >
        <input
          type="text"
          id="search-bar"
          className={`peer relative w-full rounded-md border-none border-transparent px-3 py-3 pl-12 placeholder-transparent focus:outline-none focus:ring-0`}
          placeholder="Username"
          onChange={changeEventHanlder}
        />

        <MagnifyingGlassIcon className="absolute start-3 top-3 h-auto w-6 " />

        <span className="pointer-events-none absolute start-12 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-700">
          Search Products
        </span>
      </label>
    </div>
  );
}
