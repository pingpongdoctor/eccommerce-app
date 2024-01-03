'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';

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
  const [slides, setSlides] = useState<number>(3);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        setSlides(3);
      } else if (window.innerWidth >= 640) {
        setSlides(2);
      } else {
        setSlides(1);
      }
    });

    return () => {
      window.removeEventListener('resize', () => {
        if (window.innerWidth >= 768) {
          setSlides(3);
        } else if (window.innerWidth >= 640) {
          setSlides(2);
        } else {
          setSlides(1);
        }
      });
    };
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    autoplay: carouselAutoPlay,
    autoplaySpeed: carouselAutoPlaySpeed,
    pauseOnHover: carouselPauseOnHover,
    swipeToSlide: carouselSwipeToSlide,
    slidesToShow: slides,
    slidesToScroll: 1,
    centerMode: true,
    row: 1,
  };

  return (
    <div className="[&>div>div>div]:flex [&>div>div>div]:gap-4">
      <Slider {...settings}>
        {CarouselFC?.length > 0 &&
          CarouselFC.map((CarouselItem, index) => <CarouselItem key={index} />)}
      </Slider>
    </div>
  );
}
