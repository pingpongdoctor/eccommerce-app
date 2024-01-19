import React from 'react';
import RatingStar from './RatingStar';
import { StarIcon } from '@heroicons/react/20/solid';
import CustomerReview from './CustomerReview';
import ButtonComponent from './ButtonComponent';

const spanWidth = [
  'max-w-[35%]',
  'max-w-[15%]',
  'max-w-[25%]',
  'max-w-[35%]',
  'max-w-[5%]',
];

const star: { [index: number]: number } = {
  0: 5,
  1: 4,
  2: 3,
  3: 2,
  4: 1,
};

interface Props {
  customerReviewsClassname?: string;
}

export default function CustomerReviews({ customerReviewsClassname }: Props) {
  return (
    <div
      className={`lg:flex lg:justify-between lg:gap-32 ${customerReviewsClassname}`}
    >
      <div>
        <h3 className="mb-4">Customer Reiview</h3>
        <div className="mb-6 flex gap-4">
          <RatingStar />
          <p className="pb-1">50 Reviews</p>
        </div>

        <div>
          {spanWidth?.length > 0 &&
            spanWidth.map((ele: string, index: number) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 hover:animate-pulse"
                >
                  <div className="flex gap-2">
                    <p>{star[index]}</p>
                    <StarIcon className="mt-[0.05rem] h-5 text-gray-900" />
                  </div>

                  <div className="relative h-3 min-w-[250px] rounded-xl border border-gray-300 bg-gray-50">
                    <span
                      className={`${ele} absolute left-0 top-0 h-full w-full animate-scaleAnimation rounded-xl bg-gray-900 transition-all`}
                    ></span>
                  </div>

                  <p className="ml-1 text-nowrap text-sm">
                    {spanWidth[index].slice(7, -2)} %
                  </p>
                </div>
              );
            })}

          <ButtonComponent
            buttonClassname="bg-gray-300"
            buttonName="Write a review"
            animate={false}
          />
        </div>
      </div>

      <div className="[&>div]:border-b-[1px] last:[&>div]:border-none">
        <CustomerReview />
        <CustomerReview />
        <CustomerReview />
      </div>
    </div>
  );
}
