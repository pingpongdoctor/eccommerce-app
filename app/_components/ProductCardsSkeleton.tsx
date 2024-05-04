'use client';

export default function ProductCardsSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-8 px-4 sm:flex-row sm:flex-wrap md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
      {[1, 2, 3, 4].map((ele) => (
        <div
          key={ele}
          className="w-full sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)] xl:w-[calc((100%-6rem)/4)]"
        >
          <div className="flex flex-col gap-2">
            <div className="aspect-[1/1.2] w-full rounded-xl bg-gray-200"></div>
            <div className="h-6 w-[50%] rounded-xl bg-gray-200"></div>
            <div className="h-6 w-[50%] rounded-xl bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
