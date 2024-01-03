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
          carouselAutoPlaySpeed={1200}
          carouselAutoPlay={true}
        />
      </div>
      <div className="z-1 relative flex flex-col gap-4 lg:hidden">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </>
  );
}
