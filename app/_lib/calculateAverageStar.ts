import { Review } from '@prisma/client';

//this function calculate the average star for a product
export const calculateAverageStar = function (
  productReviews: (Review & { user: { name: string; imgUrl: string } })[]
): number | undefined {
  try {
    const starCounts: number[] = [0, 0, 0, 0, 0];

    productReviews.map(
      (review: Review & { user: { name: string; imgUrl: string } }) => {
        starCounts[review.star - 1] += 1;
      }
    );

    const totalReviews = productReviews.length;

    const sum = starCounts.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue * (starCounts.indexOf(currentValue) + 1)
    );

    return sum / totalReviews;
  } catch (e: any) {
    console.log('Error calculating average star' + ' ' + e.message);
    return undefined;
  }
};
