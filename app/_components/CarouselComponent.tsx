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
  carouselSlidesToShow: number;
  carouselCenterPadding: string;
}

export default function CarouselComponent({
  CarouselFC,
  carouselAutoPlay,
  carouselAutoPlaySpeed,
  carouselPauseOnHover = true,
  carouselSwipeToSlide = true,
  carouselSlidesToShow,
  carouselCenterPadding,
}: Props) {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: carouselAutoPlay,
    autoplaySpeed: carouselAutoPlaySpeed,
    pauseOnHover: carouselPauseOnHover,
    swipeToSlide: carouselSwipeToSlide,
    slidesToShow: carouselSlidesToShow,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: carouselCenterPadding,
  };

  return (
    <Slider {...settings}>
      {CarouselFC?.length > 0 &&
        CarouselFC.map((CarouselItem, index) => (
          <div key={index}>
            <CarouselItem />
          </div>
        ))}
    </Slider>
  );
}
