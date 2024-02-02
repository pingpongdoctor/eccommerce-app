'use client';
import { XMarkIcon } from '@heroicons/react/20/solid';

export default function ShoppingCartItemSkeleton() {
  return (
    <div className="flex animate-pulse gap-6 last:mb-0">
      <div className="aspect-[1/1.2] w-48 rounded-md bg-gray-200"></div>
      <div className="grow">
        <div className="flex flex-col gap-4 sm:mb-4 sm:flex-row sm:justify-between">
          <div className="flex justify-between sm:block">
            <div className="h-6 w-20 rounded-xl bg-gray-200"></div>
            <XMarkIcon className="block h-6 text-gray-400 sm:hidden" />
          </div>
          <div className="block h-6 w-12 rounded-xl bg-gray-200 sm:hidden"></div>
          <div className="h-6 w-20 rounded-xl bg-gray-200"></div>
        </div>
        <div className="hidden h-6 w-12 rounded-xl bg-gray-200 sm:block"></div>
      </div>
    </div>
  );
}
