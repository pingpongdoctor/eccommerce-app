'use client';
import { ThreeDots } from 'react-loader-spinner';
import React from 'react';

interface Props {
  buttonName: string;
  isDisabled?: boolean;
  buttonOnclickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
      className={`group relative h-[50px] w-[100px] rounded-md border-none font-bold transition-transform duration-200 active:scale-[0.98] ${buttonClassname}`}
      disabled={isDisabled}
      onClick={buttonOnclickHandler}
    >
      {animate && (
        <span
          className={`absolute left-0 top-0 flex h-full w-1 rounded-md bg-black transition-all group-hover:w-full group-disabled:hidden`}
        ></span>
      )}
      <span
        className={`absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-md transition-all ${
          animate ? `text-black group-hover:text-white` : `bg-black text-white`
        } group-disabled:hidden`}
      >
        <p>{buttonName}</p>
      </span>
      <span className="absolute left-0 top-0 hidden h-full w-full items-center justify-center rounded-md group-disabled:flex">
        <ThreeDots
          visible={true}
          height="50"
          width="50"
          color={animate ? 'black' : 'white'}
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </span>
    </button>
  );
}
