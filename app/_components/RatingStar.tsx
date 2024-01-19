'use client';

import React from 'react';
import { Rating } from '@material-tailwind/react';

interface Props {
  ratingClassname?: string;
}

export default function RatingStar({ ratingClassname }: Props) {
  return (
    <div className={`[&>div_span_svg]:text-gray-900 ${ratingClassname}`}>
      <Rating value={4} placeholder="rating-star" />
    </div>
  );
}
