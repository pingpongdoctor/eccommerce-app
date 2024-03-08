'use client';
import { Rating } from '@material-tailwind/react';

interface Props {
  ratingClassname?: string;
  starValue?: number;
  starReadonly?: boolean;
  starChangeEventHandler?: (value: number) => void;
  id?: string;
}

export default function RatingStar({
  ratingClassname,
  starValue,
  starReadonly = true,
  starChangeEventHandler,
  id,
}: Props) {
  return (
    <div
      className={`[&>div_span_svg]:cursor-default [&>div_span_svg]:text-gray-900 ${ratingClassname}`}
    >
      <Rating
        id={id}
        readonly={starReadonly}
        value={starValue}
        placeholder="rating-star"
        onChange={starChangeEventHandler}
      />
    </div>
  );
}
