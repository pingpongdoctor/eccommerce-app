'use client';

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import { builder } from '../utils/imageBuilder';

interface Props {
  imageArr: ImageInfor[];
}

export default function CarouselComponent({ imageArr }: Props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="sm:hidden">
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        removeArrowOnDeviceType={['tablet', 'mobile']}
      >
        {imageArr?.length > 0 ? (
          imageArr.map((imageInfor: ImageInfor) => (
            <Image
              key={imageInfor._key}
              src={builder.image(imageInfor).quality(80).url()}
              width={300}
              height={300}
              alt="carousel-image"
              className="aspect-square w-full object-cover"
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Carousel>
    </div>
  );
}
