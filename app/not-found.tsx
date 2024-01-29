import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[300px] px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
