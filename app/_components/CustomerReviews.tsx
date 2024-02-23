import RatingStar from './RatingStar';
import { StarIcon } from '@heroicons/react/20/solid';
import CustomerReview from './CustomerReview';
import { Review } from '@prisma/client';
import { calculateRatingBarWidth } from '../_lib/calculateRatingBarWidth';
import { calculateAverageStar } from '../_lib/calculateAverageStar';
import AddNewReviewComponent from './AddNewReviewComponent';

interface Props {
  customerReviewsClassname?: string;
  productReviews: (Review & { user: { name: string; imgUrl: string } })[];

  productSlug: string;
}

export default async function CustomerReviews({
  customerReviewsClassname,
  productReviews,
  productSlug,
}: Props) {
  return (
    <div
      className={`mx-auto px-4 md:px-8 lg:flex lg:justify-between lg:gap-16 lg:px-12 xl:max-w-7xl ${customerReviewsClassname}`}
    >
      <div>
        <h3 className="mb-4">Customer Reiview</h3>
        <div className="mb-6 flex gap-4">
          <RatingStar starValue={calculateAverageStar(productReviews)} />
          <p className="pb-1">
            {productReviews.length}{' '}
            {productReviews.length < 2 ? 'review' : 'reviews'}
          </p>
        </div>

        <div>
          {/* reviewing bars */}
          <ul className="mb-8 list-none lg:mb-12">
            {calculateRatingBarWidth(productReviews).map(
              (barWidthObject: { starNum: string; ratio: string }) => {
                return (
                  <li
                    key={barWidthObject.starNum}
                    className="flex items-center gap-4 hover:animate-pulse"
                  >
                    <div className="flex items-center gap-2">
                      <p className="mt-[2px]">{barWidthObject.starNum}</p>
                      <StarIcon className="mt-[0.05rem] h-5 text-gray-900" />
                    </div>

                    <div className="relative h-3 min-w-[250px] rounded-xl border border-gray-300 bg-gray-50">
                      <span
                        style={{ maxWidth: `${barWidthObject.ratio}` }}
                        className="absolute left-0 top-0 h-full w-full animate-scaleAnimation rounded-xl bg-gray-900 transition-all"
                      ></span>
                    </div>

                    <p className="ml-1 text-nowrap text-sm text-gray-500">
                      {barWidthObject.ratio}
                    </p>
                  </li>
                );
              }
            )}
          </ul>

          {/* add your review */}
          <AddNewReviewComponent productSlug={productSlug} />
        </div>
      </div>

      {/* customer review messages */}
      <div
        className={`max-h-[700px] w-full overflow-auto lg:max-h-[505px] [&>div]:border-b ${
          productReviews.length == 0 &&
          'flex h-[500px] items-center justify-center'
        }`}
      >
        {productReviews.length > 0 ? (
          productReviews.map(
            (
              productReview: Review & { user: { name: string; imgUrl: string } }
            ) => (
              <CustomerReview
                key={productReview.id}
                productReview={productReview}
              />
            )
          )
        ) : (
          <p className="text-xl">No Reviews</p>
        )}
      </div>
    </div>
  );
}
