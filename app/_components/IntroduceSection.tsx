import React from 'react';
import Image from 'next/image';

export default function IntroduceSection() {
  return (
    <div className="z-1 relative bg-white">
      <div className="mb-8 flex gap-28">
        <div className="flex w-[40%] flex-col gap-8 text-pretty">
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
          className="h-auto grow rounded-2xl object-cover object-center"
          width={300}
          height={300}
          priority={true}
        />
      </div>
      <div className="flex items-start justify-between">
        <Image
          src="/assets/abc.avif"
          alt="hero-image-2"
          className="h-auto w-[20%] self-end rounded-2xl"
          width={300}
          height={300}
          priority={true}
        />
        <Image
          src="/assets/abc.avif"
          alt="hero-image-3"
          className="h-auto w-[45%] rounded-2xl"
          width={300}
          height={300}
          priority={true}
        />{' '}
        <Image
          src="/assets/abc.avif"
          alt="hero-image-4"
          className="h-auto w-[30%] rounded-2xl"
          width={300}
          height={300}
          priority={true}
        />
      </div>
    </div>
  );
}
