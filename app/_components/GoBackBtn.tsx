'use client';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

interface Props {
  goBackBtnClassname?: string;
}

export default function GoBackBtn({ goBackBtnClassname }: Props) {
  const router = useRouter();
  return (
    <div className={goBackBtnClassname}>
      <div
        className="group flex w-[85px] cursor-default items-center py-4"
        onClick={() => {
          router.back();
        }}
      >
        <ChevronLeftIcon className="h-6 w-6 flex-none text-gray-700 transition-all duration-500 group-hover:translate-x-[-4px]" />
        <p className="font-medium text-gray-700">Go back</p>
      </div>
    </div>
  );
}
