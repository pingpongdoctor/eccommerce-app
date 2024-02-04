'use client';
import { ThreeDots } from 'react-loader-spinner';
import { MouseEvent } from 'react';

interface Props {
  buttonName: string;
  isDisabled?: boolean;
  buttonOnclickHandler?: (e: MouseEvent<HTMLButtonElement>) => void;
  animate: boolean;
  buttonClassname?: string;
}

export default function ButtonComponent({
  buttonName,
  isDisabled = false,
  buttonOnclickHandler,
  animate,
  buttonClassname,
}: Props) {
  return (
    <button
      className={`group relative h-[50px] w-full rounded-[0.42rem] border border-gray-400 text-sm font-semibold transition-transform duration-200 active:scale-[0.98] ${buttonClassname}`}
      disabled={isDisabled}
      onClick={buttonOnclickHandler}
    >
      {animate && (
        <span
          className={`absolute left-0 top-0 flex h-full w-1 rounded-md bg-gray-900 transition-all group-hover:w-full group-disabled:hidden`}
        ></span>
      )}
      <span
        className={`absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-md transition-all ${
          animate ? `group-hover:text-white` : `bg-white hover:bg-[#fafafa]`
        } group-disabled:hidden`}
      >
        {buttonName}
      </span>
      <span className="absolute left-0 top-0 hidden h-full w-full items-center justify-center rounded-md group-disabled:flex">
        <ThreeDots
          visible={true}
          height="50"
          width="50"
          color="black"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </span>
    </button>
  );
}
