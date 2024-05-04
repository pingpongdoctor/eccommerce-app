'use client';
import RatingStar from './RatingStar';
import { StarIcon } from '@heroicons/react/20/solid';
import CustomerReview from './CustomerReview';
import { Review } from '@prisma/client';
import { calculateRatingBarWidth } from '../_lib/calculateRatingBarWidth';
import { calculateAverageStar } from '../_lib/calculateAverageStar';
import AddNewReviewComponent from './AddNewReviewComponent';
import { useEffect, useState } from 'react';
import { getProductReviews } from '../_lib/getProductReviews';
import Pusher from 'pusher-js';
import { sortReviews } from '../_lib/sortReviews';
import ReviewsSkeletonComponent from './ReviewsSkeletonComponent';

interface Props {
  customerReviewsClassname?: string;
  productSlug: string;
}

export default function CustomerReviews({
  customerReviewsClassname,
  productSlug,
}: Props) {
  const [productReviews, setProductReviews] = useState<
    (Review & { user: { name: string; imgUrl: string } })[]
  >([]);
  const [isNewReview, setIsNewReview] = useState<boolean>(false);
  const [isFetchingReviews, setIsFetchingReviews] = useState<boolean>(false);

  //function to update rating star value
  const updateRatingStarValue = function (averageStarNum: number) {
    try {
      if (averageStarNum > 0) {
        const ratingElement = document.getElementById('main-rating');
        if (!ratingElement) {
          return;
        }
        const svgElements = ratingElement.getElementsByTagName('svg');

        for (let i = 1; i <= 5; i++) {
          const curSvgElement = svgElements[i - 1];
          if (i <= averageStarNum) {
            curSvgElement.setAttribute('fill', 'currentColor');
          } else {
            curSvgElement.setAttribute('fill', 'none');
          }
        }
      }
    } catch (e: any) {
      console.log('Error in updateRatingStarValue' + e);
    }
  };

  //update value of rating star element using document object since Material-Tailwind Rating element does not absorb new updated state value
  useEffect(() => {
    const averageStarNum =
      productReviews.length > 0 ? calculateAverageStar(productReviews) || 0 : 0;

    updateRatingStarValue(averageStarNum);
  }, [productReviews]);

  //bind a function to new-reviews channel to listen to the new-reviews event
  //when there are new reviews, set productReview state with new value to update the UI
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    });

    const channel = pusher.subscribe('new-reviews');

    channel.bind(`new-reviews-${productSlug}-event`, function () {
      setIsNewReview(true);
    });

    return () => {
      pusher.unsubscribe('new-reviews');
      channel.unbind_all();
      pusher.disconnect();
    };
  }, [productSlug]);

  //get product reviews when page is initially loaded
  useEffect(() => {
    setIsFetchingReviews(true);
    getProductReviews(productSlug)
      .then(
        (
          reviews:
            | (Review & { user: { name: string; imgUrl: string } })[]
            | undefined
        ) => {
          if (!reviews) {
            setProductReviews([]);
            return;
          }

          setProductReviews(sortReviews(reviews));
        }
      )
      .catch((e: any) => {
        console.log(e);
        setProductReviews([]);
      })
      .finally(() => {
        setIsFetchingReviews(false);
      });
  }, [productSlug]);

  //get new reviews when isNewReview is true
  useEffect(() => {
    if (isNewReview) {
      getProductReviews(productSlug)
        .then(
          (
            reviews:
              | (Review & { user: { name: string; imgUrl: string } })[]
              | undefined
          ) => {
            if (!reviews) {
              setProductReviews([]);
              return;
            }

            setProductReviews(sortReviews(reviews));
          }
        )
        .catch((e: any) => {
          console.log(e);
          setProductReviews([]);
        })
        .finally(() => {
          setIsNewReview(false);
        });
    }
  }, [isNewReview]);

  return (
    <div
      className={`mx-auto px-4 md:px-8 lg:flex lg:justify-between lg:gap-16 lg:px-12 xl:max-w-7xl ${customerReviewsClassname}`}
    >
      <div>
        <h3 className="mb-4">Customer Review</h3>
        <div className="mb-6 flex gap-4">
          {<RatingStar starValue={0} id="main-rating" />}
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
      {isFetchingReviews ? (
        <ReviewsSkeletonComponent />
      ) : productReviews.length > 0 ? (
        <ul className="max-h-[700px] w-full list-none overflow-auto lg:max-h-[505px] [&>div]:border-b">
          {productReviews.map(
            (
              productReview: Review & { user: { name: string; imgUrl: string } }
            ) => (
              <CustomerReview
                key={productReview.id}
                productReview={productReview}
              />
            )
          )}
        </ul>
      ) : (
        <div className="flex h-[500px] w-full items-center justify-center">
          <p className="text-xl"> No Reviews</p>
        </div>
      )}
    </div>
  );
}
