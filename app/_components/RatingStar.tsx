'use client';

import React from 'react';
import { Rating } from '@material-tailwind/react';

export default function RatingStar() {
  return (
    <div className="[&>div_span_svg]:text-gray-900">
      <Rating value={4} placeholder="rating-star" />
    </div>
  );
}
