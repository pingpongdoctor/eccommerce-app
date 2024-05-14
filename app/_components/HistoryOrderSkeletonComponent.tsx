'use client';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

export default function HistoryOrderSkeletonComponent() {
  const pTagSkeletonElement = (
    <div className="h-8 w-24 animate-pulse rounded-xl bg-gray-200 md:w-28 lg:w-32"></div>
  );

  return (
    <div className="rounded-lg border">
      <div className="p-4 pb-0 md:p-8 md:pb-0 lg:p-12 lg:pb-0">
        <ul className="flex h-[6rem] w-full list-none justify-between">
          {[1, 2, 3, 4, 5].map((ele) => (
            <li
              key={ele}
              className={`${ele === 2 || ele === 5 ? 'hidden md:block' : ''} ${
                ele === 4 ? 'block md:hidden' : ''
              } flex flex-col`}
            >
              <div className="mb-2 h-8 w-24 animate-pulse rounded-xl bg-gray-200 md:w-28 lg:w-32"></div>
              <div className="h-8 w-24 animate-pulse rounded-xl bg-gray-200 md:w-28 lg:w-32"></div>
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <CheckCircleIcon className="h-8 w-6 text-green-500" />
          <div className="h-8 w-24 animate-pulse rounded-xl bg-gray-200 md:w-28 lg:w-32"></div>
        </div>
      </div>

      <div className="my-4 h-[1px] w-full bg-gray-200 md:my-8"></div>

      <ul className="flex flex-col gap-8 p-4 pt-0 md:gap-12 md:p-8 md:pt-0 lg:p-12 lg:pt-0">
        {[1, 2].map((ele) => (
          <li key={ele} className="flex items-center gap-4 md:items-start">
            <div className="aspect-square grow animate-pulse rounded-md bg-gray-200"></div>

            <div className="flex w-[50%] flex-col gap-12 sm:w-[65%] md:w-[70%]">
              <div className="flex items-end justify-between">
                {pTagSkeletonElement}
                {pTagSkeletonElement}
              </div>
              {pTagSkeletonElement}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
