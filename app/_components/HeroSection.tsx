import React from 'react';

export default function HeroSection() {
  return (
    <div className="m-4 md:m-8 lg:m-12">
      <div className="sticky top-0 z-0 aspect-[1.5/1] w-full rounded-3xl bg-[url('/assets/pexels-scott-webb-403571.jpg')] bg-contain bg-center bg-no-repeat xl:mx-auto xl:max-w-[74rem]">
        <div className="from-yellow-70 to-green-70 via-green-70 flex h-full w-full items-center bg-gradient-to-r">
          <h1 className="ml-4 w-[60%] text-balance font-dancingScript text-4xl sm:text-5xl md:ml-8 md:text-6xl lg:ml-12 lg:text-7xl">
            Welcome to the Glowy Lab Family
          </h1>
        </div>
      </div>
    </div>
  );
}
