"use client";
import { ThreeDots } from "react-loader-spinner";
import React from "react";

interface Props {
  buttonName: string;
  buttonType?: "submit" | "reset" | "button" | undefined;
  isDisabled?: boolean;
  buttonOnclickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonColor?: "blue" | "black";
  animate: boolean;
  buttonClassname?: string;
}

const bgColors: { [index: string]: string } = {
  blue: "bg-blue-600",
  black: "bg-black",
};

const hoverBgColors: { [index: string]: string } = {
  blue: "hover:bg-blue-700",
  black: "hover:bg-black",
};

const borderColors: { [index: string]: string } = {
  blue: "border-blue-600",
  black: "border-black",
};

const textColors: { [index: string]: string } = {
  blue: "text-blue-600",
  black: "text-black",
};

export default function ButtonComponent({
  buttonName,
  buttonType,
  isDisabled = false,
  buttonOnclickHandler,
  buttonColor = "black",
  animate,
  buttonClassname,
}: Props) {
  return (
    <button
      className={`prose group relative h-[50px] w-[100px] rounded-md border-[1.5px] font-bold transition-transform duration-200 active:scale-[0.98] ${borderColors[buttonColor]} ${buttonClassname}`}
      type={buttonType}
      disabled={isDisabled}
      onClick={buttonOnclickHandler}
    >
      {animate && (
        <span
          className={`absolute left-0 top-0 flex h-full w-1 rounded ${bgColors[buttonColor]} transition-all group-hover:w-full group-disabled:hidden`}
        ></span>
      )}
      <span
        className={`absolute left-0 top-0 flex h-full w-full items-center justify-center rounded transition-all ${
          animate
            ? `${textColors[buttonColor]} group-hover:text-white`
            : `text-white ${bgColors[buttonColor]} ${hoverBgColors[buttonColor]}`
        } group-disabled:hidden`}
      >
        <p>{buttonName}</p>
      </span>
      <span className="absolute left-0 top-0 hidden h-full w-full items-center justify-center rounded-md group-disabled:flex">
        <ThreeDots
          visible={true}
          height="50"
          width="50"
          color={animate ? buttonColor : "white"}
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </span>
    </button>
  );
}
