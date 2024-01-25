'use client';

import React from 'react';
import { Rating } from '@material-tailwind/react';

interface Props {
  ratingClassname?: string;
  starValue?: number;
  starReadonly?: boolean;
}

export default function RatingStar({
  ratingClassname,
  starValue,
  starReadonly = true,
}: Props) {
  return (
    <div className={`[&>div_span_svg]:text-gray-900 ${ratingClassname}`}>
      <Rating
        readonly={starReadonly}
        value={starValue}
        placeholder="rating-star"
      />
    </div>
  );
}
