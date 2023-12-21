import React from "react";

interface Props {
  buttonName: string;
  buttonType: "submit" | "reset" | "button" | undefined;
}

export default function ButtonComponent({ buttonName, buttonType }: Props) {
  return (
    <button
      className="px-8 py-4 rounded-md font-bold text-white bg-black hover:scale-[1.03] duration-300"
      type={buttonType}
    >
      {buttonName}
    </button>
  );
}
