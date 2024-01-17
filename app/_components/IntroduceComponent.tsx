import React from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { SanityDocument } from 'next-sanity';
import supplementImg from '../../public/assets/supplement.jpg';
import comesticImg from '../../public/assets/comestic.jpg';
import jewelryImg from '../../public/assets/jewelry.jpg';
import bookImg from '../../public/assets/books.jpg';

export default function IntroduceComponent({
  homePageData,
}: {
  homePageData: SanityDocument;
}) {
  return (
    <div className="bg-white px-4 pb-12 pt-12 md:px-8 lg:px-12 lg:pb-16 lg:pt-16 xl:mx-auto xl:max-w-7xl">
      <div className="mb-8 block lg:flex lg:gap-16 xl:gap-28">
        <div className="w-full text-pretty text-xl lg:w-[55%] [&_p]:mb-4">
          <h1 className="text-pretty">{homePageData.introheading}</h1>
          <PortableText value={homePageData.introcontent} />
        </div>

        <Image
          src={comesticImg}
          alt="hero-image-1"
          className="hidden h-auto grow rounded-2xl object-fill object-center lg:block"
          priority
          placeholder="blur"
        />
      </div>
      <div className="flex justify-between lg:items-start">
        <Image
          src={supplementImg}
          alt="hero-image-2"
          className="hidden h-auto w-[20%] rounded-2xl lg:block lg:self-end"
          priority
          placeholder="blur"
        />
        <Image
          src={jewelryImg}
          alt="hero-image-3"
          className="h-auto w-[64%] rounded-2xl lg:w-[45%]"
          priority
          placeholder="blur"
        />
        <div className="flex w-[31%] flex-col justify-between lg:block lg:w-[30%]">
          <Image
            src={bookImg}
            alt="hero-image-4"
            className="h-auto w-full rounded-2xl"
            priority
            placeholder="blur"
          />
          <Image
            src={supplementImg}
            alt="hero-image-2"
            className="h-auto w-full rounded-2xl lg:hidden"
            priority
            placeholder="blur"
          />
        </div>
      </div>
    </div>
  );
}
