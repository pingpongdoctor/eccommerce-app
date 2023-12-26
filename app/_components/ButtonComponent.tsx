"use client";
import { ThreeDots } from "react-loader-spinner";
import React from "react";

interface Props {
  buttonName: string;
  buttonType?: "submit" | "reset" | "button" | undefined;
  isDisabled?: boolean;
  buttonOnclickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonColor?: "blue" | "black";
}

const bgColors: { [index: string]: string } = {
  blue: "bg-blue-700",
  black: "bg-black",
};

const borderColors: { [index: string]: string } = {
  blue: "border-blue-700",
  black: "border-black",
};

export default function ButtonComponent({
  buttonName,
  buttonType,
  isDisabled = false,
  buttonOnclickHandler,
  buttonColor = "black",
}: Props) {
  return (
    <button
      className={`group relative h-[50px] w-[100px] rounded-md border-[1.5px] font-bold ${borderColors[buttonColor]}`}
      type={buttonType}
      disabled={isDisabled}
      onClick={buttonOnclickHandler}
    >
      <span
        className={`absolute left-0 top-0 flex h-full w-1 rounded ${bgColors[buttonColor]} transition-all group-hover:w-full group-disabled:hidden`}
      ></span>
      <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-md text-black transition-all group-hover:text-white group-disabled:hidden">
        <p>{buttonName}</p>
      </span>
      <span className="absolute left-0 top-0 hidden h-full w-full items-center justify-center rounded-md group-disabled:flex">
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
