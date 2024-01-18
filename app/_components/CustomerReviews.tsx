import React from 'react';
import RatingStar from './RatingStar';
import { StarIcon } from '@heroicons/react/20/solid';

const data = [35, 15, 23, 27, 10];

const convertData = function (data: number[]): string[] {
  return [...data].map((ele) => {
    return 'max-w-[' + ele + '%]';
  });
};

const star: { [index: number]: number } = {
  0: 5,
  1: 4,
  2: 3,
  3: 2,
  4: 1,
};

export default function CustomerReviews() {
  return (
    <div>
      <h3 className="mb-4">Customer Reiview</h3>
      <div className="mb-6 flex gap-4">
        <RatingStar />
        <p className="pb-1">50 Reviews</p>
      </div>

      {data?.length == 5 &&
        convertData(data).map((ele: string, index: number) => (
          <div
            key={index}
            className="flex items-center gap-4 hover:animate-pulse"
          >
            <div className="flex gap-2">
              <p>{star[index]}</p>
              <StarIcon className="mt-[0.05rem] h-5 text-gray-900" />
            </div>

            <div className="relative h-3 min-w-[300px] rounded-xl border border-gray-300 bg-gray-50">
              <span
                className={`absolute left-0 top-0 h-full w-full animate-scaleAnimation ${ele} rounded-xl bg-gray-900 transition-all`}
              ></span>
            </div>

            <p className="ml-1 text-sm">{data[index]} %</p>
          </div>
        ))}
    </div>
  );
}
