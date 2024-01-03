'use client';

import React from 'react';
import CarouselComponent from './CarouselComponent';
import BlogCard from './BlogCard';

export default function BlogCards() {
  return (
    <CarouselComponent
      CarouselFC={[BlogCard, BlogCard, BlogCard, BlogCard, BlogCard]}
      carouselSlidesToShow={3}
      carouselCenterPadding="2rem"
      carouselAutoPlaySpeed={1000}
      carouselAutoPlay={true}
    />
  );
}
