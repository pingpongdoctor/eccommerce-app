import React from 'react';
import Image from 'next/image';

export default function IntroduceSection() {
  return (
    <div className="z-1 relative bg-white p-4 pb-12 pt-12 md:p-8 lg:p-12 lg:pb-16 lg:pt-16 xl:mx-auto xl:max-w-7xl">
      <div className="mb-8 block lg:flex lg:gap-16 xl:gap-28">
        <div className="flex w-full flex-col gap-8 text-pretty lg:w-[40%]">
          <h1 className="mb-0">Our people</h1>
          <p className="text-xl">
            Quasi est quaerat. Sit molestiae et. Provident ad dolorem occaecati
            eos iste. Soluta rerum quidem minus ut molestiae velit error quod.
            Excepturi quidem expedita molestias quas.
          </p>
          <p className="text-xl">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat. Quasi aperiam sit.
          </p>
        </div>
        <Image
          src="/assets/abc.avif"
          alt="hero-image-1"
          className="hidden h-auto grow rounded-2xl object-cover object-center lg:block"
          width={300}
          height={300}
          priority={true}
        />
      </div>
      <div className="flex justify-between lg:items-start">
        <Image
          src="/assets/abc.avif"
          alt="hero-image-2"
          className="hidden h-auto w-[20%] rounded-2xl lg:block"
          width={300}
          height={300}
          priority={true}
        />
        <Image
          src="/assets/abc.avif"
          alt="hero-image-3"
          className="h-auto w-[64%] rounded-2xl lg:w-[45%]"
          width={300}
          height={300}
          priority={true}
        />{' '}
        <div className="flex w-[31%] flex-col justify-between lg:block lg:w-[30%]">
          <Image
            src="/assets/abc.avif"
            alt="hero-image-4"
            className="h-auto w-full rounded-2xl"
            width={300}
            height={300}
            priority={true}
          />
          <Image
            src="/assets/abc.avif"
            alt="hero-image-2"
            className="h-auto w-full rounded-2xl lg:hidden"
            width={300}
            height={300}
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}
