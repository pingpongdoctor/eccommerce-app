import { Review } from '@prisma/client';

export const calculateRatingBarWidth = function (
  productReviews: (Review & { user: { name: string; imgUrl: string } })[]
) {
  const starCounts: number[] = [0, 0, 0, 0, 0];

  productReviews.map(
    (review: Review & { user: { name: string; imgUrl: string } }) => {
      starCounts[review.star - 1] += 1;
    }
  );

  const totalReviews = productReviews.length;

  return starCounts.map(
    (starNum: number) => `${(starNum / totalReviews) * 100}%`
  );
};
