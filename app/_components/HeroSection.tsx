import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div>
      <div className="flex items-center">
        <div className="flex-1">
          <h1>Our people</h1>
          Quasi est quaerat. Sit molestiae et. Provident ad dolorem occaecati
          eos iste. Soluta rerum quidem minus ut molestiae velit error quod.
          Excepturi quidem expedita molestias quas. Anim aute id magna aliqua ad
          ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
          amet fugiat veniam occaecat fugiat. Quasi aperiam sit non sit neque
          reprehenderit.
        </div>
        <Image
          src="/assets/abc.avif"
          alt="hero-image-1"
          className="h-auto w-full flex-1"
          width={300}
          height={300}
          priority={true}
        />
      </div>
      <div className="flex">
        <Image
          src="/assets/abc.avif"
          alt="hero-image-2"
          className="h-auto w-[30%]"
          width={300}
          height={300}
          priority={true}
        />
        <Image
          src="/assets/abc.avif"
          alt="hero-image-3"
          className="h-auto w-[45%] flex-1"
          width={300}
          height={300}
          priority={true}
        />{' '}
        <Image
          src="/assets/abc.avif"
          alt="hero-image-4"
          className="h-auto w-[25%] flex-1"
          width={300}
          height={300}
          priority={true}
        />
      </div>
    </div>
  );
}
