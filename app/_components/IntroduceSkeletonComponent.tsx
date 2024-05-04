'use client';
export default function IntroduceSkeletonComponent() {
  return (
    <div className="bg-white px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl ">
      <div className="mb-8 block lg:flex lg:gap-16 xl:gap-28">
        <div className="w-full lg:w-[32%]">
          <div className="mb-8 h-16 w-full animate-pulse rounded-xl bg-gray-200"></div>
          <div className="h-[10rem] w-full animate-pulse rounded-xl bg-gray-200"></div>
        </div>
        <div className="hidden aspect-[16/13] grow animate-pulse rounded-2xl bg-gray-200 lg:block"></div>
      </div>
      <div className="flex justify-between lg:items-start">
        <div className="hidden aspect-[16/12] w-[20%] animate-pulse rounded-2xl bg-gray-200 lg:block lg:self-end"></div>
        <div className="aspect-[16/12] w-[64%] animate-pulse rounded-2xl bg-gray-200 lg:w-[45%]"></div>
        <div className="flex aspect-[16/12] w-[31%] flex-col justify-between lg:block lg:w-[30%]">
          <div className="aspect-[16/12] w-full animate-pulse rounded-2xl bg-gray-200"></div>
          <div className="aspect-[16/12] w-full animate-pulse rounded-2xl bg-gray-200 lg:hidden"></div>
        </div>
      </div>
    </div>
  );
}
