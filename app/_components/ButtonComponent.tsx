import React from "react";

interface Props {
  buttonName: string;
  buttonType: "submit" | "reset" | "button" | undefined;
}

export default function ButtonComponent({ buttonName, buttonType }: Props) {
  return (
    <button
      className="group w-[100px] h-[50px] border border-black rounded-md font-bold transition-all hover:scale-[1.03 relative"
      type={buttonType}
    >
      <span className="absolute rounded-md z-0 left-0 top-0 w-1 h-full bg-black transition-all group-hover:w-full flex items-center justify-center"></span>
      <span className="absolute rounded-md left-0 top-0 flex items-center justify-center transition-all w-full h-full text-black group-hover:text-white">
        <p>{buttonName}</p>
      </span>
    </button>
  );
}
