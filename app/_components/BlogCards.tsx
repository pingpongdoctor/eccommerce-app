'use client';

import React from 'react';
import CarouselComponent from './CarouselComponent';
import BlogCard from './BlogCard';

export default function BlogCards() {
  return (
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
  );
}
