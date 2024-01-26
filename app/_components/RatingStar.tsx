'use client';

import React, { ChangeEvent } from 'react';
import { Rating } from '@material-tailwind/react';

interface Props {
  ratingClassname?: string;
  starValue?: number;
  starReadonly?: boolean;
  starChangeEventHandler?: (value: number) => void;
}

export default function RatingStar({
  ratingClassname,
  starValue,
  starReadonly = true,
  starChangeEventHandler,
}: Props) {
  return (
    <div className={`[&>div_span_svg]:text-gray-900 ${ratingClassname}`}>
      <Rating
        readonly={starReadonly}
        value={Math.round(starValue || 0)}
        placeholder="rating-star"
        onChange={starChangeEventHandler}
      />
    </div>
  );
}
