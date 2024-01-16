import React from 'react';
import heroImage from '../../public/assets/pexels-scott-webb-403571.jpg';
import Image from 'next/image';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';

export default function HeroSection({
  heroImage,
  blurHeroImage,
}: {
  heroImage: string;
  blurHeroImage: string | undefined;
}) {
  return (
    <div className="m-4 md:m-8 lg:m-12">
      <div className="relative xl:mx-auto xl:max-w-[74rem]">
        {/* use Next.js static image to let Next.js infer intial width and height and to allow using blurred placeholder without providing blurDataUrl */}
        <Image
          className="aspect-[1.5/1] w-full rounded-3xl bg-contain bg-center bg-no-repeat"
          src={heroImage}
          alt="hero-image"
          placeholder="blur"
          blurDataURL={blurHeroImage}
          width={300}
          height={300}
        />
        <h1 className="absolute left-0 top-0 ml-4 flex h-full w-[60%] items-center text-balance font-dancingScript text-4xl sm:text-5xl md:ml-8 md:text-6xl lg:ml-12 lg:text-7xl">
          Welcome to the Glowy Lab Family
        </h1>
      </div>
    </div>
  );
}
