import { SanityDocument } from 'next-sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { builder } from '../utils/imageBuilder';
import { solidBlureDataUrl } from '../utils/utils';
import RatingStar from './RatingStar';
import ButtonComponent from './ButtonComponent';
import { Review } from '@prisma/client';
import { calculateAverageStar } from '../_lib/calculateAverageStar';

interface Props {
  product: SanityProduct & SanityDocument;
  productReviews:
    | (Review & { user: { name: string; imgUrl: string } })[]
    | undefined;
}

export default function ProductDetail({ product, productReviews }: Props) {
  const { title, detail, price, images } = product;

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
      {/* product images */}
      {images?.length > 0 && (
        <div className="mb-8 list-none md:flex md:max-w-[900px] md:items-center md:gap-4 lg:mb-12 lg:gap-8">
          <Image
            className="aspect-square w-full rounded-lg object-cover md:w-[95%] lg:w-[78%]"
            src={builder.image(images[0]).quality(80).url()}
            width={200}
            height={200}
            alt={images[0].alt || 'product-image'}
            priority
            placeholder="blur"
            blurDataURL={solidBlureDataUrl}
          />
          <div className="hidden md:flex md:flex-col md:gap-4 lg:gap-8">
            <Image
              className="aspect-square w-full rounded-lg object-cover"
              src={builder.image(images[0]).quality(80).url()}
              width={200}
              height={200}
              alt={images[0].alt || 'product-image'}
              priority
              placeholder="blur"
              blurDataURL={solidBlureDataUrl}
            />

            <Image
              className="aspect-square w-full rounded-lg object-cover"
              src={builder.image(images[0]).quality(80).url()}
              width={200}
              height={200}
              alt={images[0].alt || 'product-image'}
              priority
              placeholder="blur"
              blurDataURL={solidBlureDataUrl}
            />
          </div>
        </div>
      )}

      {/* product title and detail */}
      <div className="mb-8 lg:mb-12 lg:flex">
        <div className="lg:grow lg:border-r-[1px] lg:pr-12">
          <div className="lg:min-h-[400px]">
            <h2>{title}</h2>
            {detail && (
              <div className="hidden lg:block">
                <PortableText value={detail} />
              </div>
            )}
          </div>
        </div>

        {productReviews && (
          <div className="mb-8 w-auto lg:w-[350px] lg:pl-12 xl:w-[400px]">
            <p className="mb-4 text-2xl text-gray-900">${price}</p>

            <div className="mb-8 flex items-center gap-4">
              <RatingStar starValue={calculateAverageStar(productReviews)} />
              <p className="pb-1">
                {productReviews.length}{' '}
                {productReviews.length == 1 ? 'review' : 'reviews'}
              </p>
            </div>

            <ButtonComponent buttonName="Add to bag" animate />
          </div>
        )}

        {detail && (
          <div className="lg:hidden">
            <PortableText value={detail} />
          </div>
        )}
      </div>
    </div>
  );
}
