import React from 'react';
import Image from 'next/image';
import testImage from '../../public/assets/abc.avif';

export default function IntroduceSection() {
  return (
    <div className="bg-white px-4 pb-12 pt-12 md:px-8 lg:px-12 lg:pb-16 lg:pt-16 xl:mx-auto xl:max-w-7xl">
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
          src={testImage}
          alt="hero-image-1"
          className="hidden h-auto grow rounded-2xl object-cover object-center lg:block"
          priority
          placeholder="blur"
        />
      </div>
      <div className="flex justify-between lg:items-start">
        <Image
          src={testImage}
          alt="hero-image-2"
          className="hidden h-auto w-[20%] rounded-2xl lg:block"
          priority
          placeholder="blur"
        />
        <Image
          src={testImage}
          alt="hero-image-3"
          className="h-auto w-[64%] rounded-2xl lg:w-[45%]"
          priority
          placeholder="blur"
        />
        <div className="flex w-[31%] flex-col justify-between lg:block lg:w-[30%]">
          <Image
            src={testImage}
            alt="hero-image-4"
            className="h-auto w-full rounded-2xl"
            priority
            placeholder="blur"
          />
          <Image
            src={testImage}
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
