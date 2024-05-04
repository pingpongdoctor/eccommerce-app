'use client';

export default function ReviewsSkeletonComponent() {
  return (
    <ul className="max-h-[700px] w-full animate-pulse list-none overflow-auto lg:max-h-[505px]">
      {[1, 2].map((ele) => (
        <li
          key={ele}
          className="flex flex-col gap-4 border-b px-4 py-8 last:border-none last:pb-0 lg:first:pt-0"
        >
          <div className="flex w-full items-center gap-4">
            <div className="size-11 rounded-full bg-gray-200"></div>
            <div className="flex w-full flex-col gap-2">
              <div className="h-4 w-[15%] rounded-xl bg-gray-200"></div>
              <div className="h-4 w-[15%] rounded-xl bg-gray-200"></div>
            </div>
          </div>
          <div className="h-24 w-full rounded-xl bg-gray-200"></div>
        </li>
      ))}
    </ul>
  );
}
