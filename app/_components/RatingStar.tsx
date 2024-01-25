'use client';

import React from 'react';
import { Rating } from '@material-tailwind/react';

interface Props {
  ratingClassname?: string;
  starValue?: number;
}

export default function RatingStar({ ratingClassname, starValue }: Props) {
  return (
    <div className={`[&>div_span_svg]:text-gray-900 ${ratingClassname}`}>
      <Rating readonly value={starValue || 5} placeholder="rating-star" />
    </div>
  );
}
