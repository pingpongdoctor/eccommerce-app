import { Review } from '@prisma/client';

//this function generates a list of objects that contain ratio and star number of product reviews
export const calculateRatingBarWidth = function (
  productReviews: (Review & { user: { name: string; imgUrl: string } })[]
): { starNum: string; ratio: string }[] {
  try {
    const starCounts: number[] = [0, 0, 0, 0, 0];

    productReviews.map(
      (review: Review & { user: { name: string; imgUrl: string } }) => {
        starCounts[review.star - 1] += 1;
      }
    );

    const totalReviews = productReviews.length;

    return starCounts
      .map((value: number, index: number) => ({
        ['starNum']: `${index + 1}`,
        ['ratio']: `${(value / totalReviews) * 100}%`,
      }))
      .reverse();
  } catch (e: any) {
    console.log('Error calculating rating bar width' + ' ' + e.message);
    return [];
  }
};
