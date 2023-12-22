"use client";
import { ThreeDots } from "react-loader-spinner";
import React from "react";

interface Props {
  buttonName: string;
  buttonType: "submit" | "reset" | "button" | undefined;
  isDisabled?: boolean;
}

export default function ButtonComponent({
  buttonName,
  buttonType,
  isDisabled = false,
}: Props) {
  return (
    <button
      className="group w-[100px] h-[50px] border border-black rounded-md font-bold relative"
      type={buttonType}
      disabled={isDisabled}
    >
      <span className="absolute rounded-md left-0 top-0 w-1 h-full bg-black transition-all group-hover:w-full group-disabled:hidden flex items-center justify-center"></span>
      <span className="absolute rounded-md left-0 top-0 flex items-center justify-center transition-all w-full h-full text-black group-hover:text-white group-disabled:hidden">
        <p>{buttonName}</p>
      </span>
      <span className="absolute rounded-md hidden left-0 top-0 w-full h-full group-disabled:flex justify-center items-center">
        <ThreeDots
          visible={true}
          height="50"
          width="50"
          color="#000"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </span>
    </button>
  );
}
