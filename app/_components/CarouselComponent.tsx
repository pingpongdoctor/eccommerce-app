'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  CarouselFC: React.FC<any>[];
  carouselAutoPlay: boolean;
  carouselAutoPlaySpeed: number;
  carouselPauseOnHover?: boolean;
  carouselSwipeToSlide?: boolean;
}

export default function CarouselComponent({
  CarouselFC,
  carouselAutoPlay,
  carouselAutoPlaySpeed,
  carouselPauseOnHover = true,
  carouselSwipeToSlide = true,
}: Props) {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: carouselAutoPlay,
    autoplaySpeed: carouselAutoPlaySpeed,
    pauseOnHover: carouselPauseOnHover,
    swipeToSlide: carouselSwipeToSlide,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    row: 1,
  };

  return (
    <div className="[&>div>div>div]:flex [&>div>div>div]:gap-8 [&>div>div>div]:bg-white">
      <Slider {...settings}>
        {CarouselFC?.length > 0 &&
          CarouselFC.map((CarouselItem, index) => <CarouselItem key={index} />)}
      </Slider>
      2
    </div>
  );
}
