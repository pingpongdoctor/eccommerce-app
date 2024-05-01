'use client';
import { Carousel } from '@material-tailwind/react';
import Image from 'next/image';
import { solidBlurDataUrl } from '../utils/utils';
import { builder } from '../utils/imageBuilder';

interface Props {
  images: SanityImage[];
  carouselClassname?: string;
}

export default function SimpleCarousel({ images, carouselClassname }: Props) {
  return (
    <Carousel
      loop
      className={`rounded-xl ${carouselClassname}`}
      placeholder="abc"
    >
      {images.map((image: SanityImage) => {
        return (
          <Image
            key={image._key}
            className="aspect-square w-full rounded-lg object-cover"
            src={builder.image(image).quality(80).url()}
            width={200}
            height={200}
            alt={image.alt || `carousel-image`}
            priority
            placeholder="blur"
            blurDataURL={solidBlurDataUrl}
          />
        );
      })}
    </Carousel>
  );
}
