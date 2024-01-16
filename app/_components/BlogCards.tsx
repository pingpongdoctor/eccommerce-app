'use client';

import React from 'react';
import CarouselComponent from './CarouselComponent';
import BlogCard from './BlogCard';

export default function BlogCards() {
  return (
    <>
      <div className="hidden lg:block">
        <CarouselComponent
          CarouselFC={[
            BlogCard,
            BlogCard,
            BlogCard,
            BlogCard,
            BlogCard,
            BlogCard,
            BlogCard,
            BlogCard,
            BlogCard,
            BlogCard,
          ]}
          carouselAutoPlaySpeed={2000}
          carouselAutoPlay={true}
        />
      </div>
      <div className="flex flex-col gap-4 bg-white px-4 md:px-8 lg:hidden">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </>
  );
}
