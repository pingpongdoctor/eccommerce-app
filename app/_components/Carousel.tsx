"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const TECarousel = dynamic(() =>
  import("tw-elements-react").then((res) => res.TECarousel),
);
const TECarouselItem = dynamic(() =>
  import("tw-elements-react").then((res) => res.TECarouselItem),
);

interface Props {
  images: (ImageInfor & { id: number; imageLink: string })[];
  carouselClassname?: string;
}

export default function Carousel({ images, carouselClassname }: Props) {
  console.log(images);
  return (
    <TECarousel
      showControls
      showIndicators
      ride="carousel"
      className="w-[500px]"
    >
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        {images?.length > 0 &&
          images.map(
            (image: ImageInfor & { id: number; imageLink: string }) => {
              return (
                <TECarouselItem
                  key={image._key}
                  itemID={image.id}
                  className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                >
                  <Image
                    src={image.imageLink}
                    className="block h-[500px] w-full object-cover"
                    alt={image._type}
                    width={300}
                    height={300}
                  />
                </TECarouselItem>
              );
            },
          )}
      </div>
    </TECarousel>
  );
}
