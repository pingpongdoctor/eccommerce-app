import React from 'react';
import RatingStar from './RatingStar';
import { StarIcon } from '@heroicons/react/20/solid';
import CustomerReview from './CustomerReview';
import ButtonComponent from './ButtonComponent';
import { Review } from '@prisma/client';

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
  productReviews: (Review & { user: { name: string; imgUrl: string } })[];
}

export default function CustomerReviews({
  customerReviewsClassname,
  productReviews,
}: Props) {
  return (
    <div
      className={`mx-auto px-4 md:px-8 lg:flex lg:justify-between lg:gap-32 lg:px-12 xl:max-w-7xl ${customerReviewsClassname}`}
    >
      <div>
        <h3 className="mb-4">Customer Reiview</h3>
        <div className="mb-6 flex gap-4">
          <RatingStar />
          <p className="pb-1">50 Reviews</p>
        </div>

        <div>
          {/* reviewing bars */}
          <ul className="mb-8 list-none lg:mb-12">
            {spanWidth?.length > 0 &&
              spanWidth.map((ele: string, index: number) => {
                return (
                  <li
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
                  </li>
                );
              })}
          </ul>

          <ButtonComponent
            buttonClassname="text-sm h-[40px]"
            buttonName="Write a review"
            animate={false}
          />
        </div>
      </div>

      {/* customer review messages */}
      <div className="[&>div]:border-b-[1px]">
        {productReviews.length > 0 &&
          productReviews.map(
            (
              productReview: Review & { user: { name: string; imgUrl: string } }
            ) => (
              <CustomerReview
                key={productReview.id}
                productReview={productReview}
              />
            )
          )}
      </div>
    </div>
  );
}
