"use client";
import React, { ChangeEvent } from "react";

interface Props {
  inputOnchangeHandler?: (
    e: ChangeEvent<HTMLInputElement>,
    updatedField: InputBoxName,
    isError: boolean
  ) => void;
  inputName: InputBoxName;
  isError?: boolean;
}

export default function InputComponent({
  inputOnchangeHandler,
  inputName,
  isError,
}: Props) {
  return (
    <label
      htmlFor={inputName}
      className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-600"
    >
      <input
        type="text"
        id={inputName}
        className={`peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0`}
        placeholder="Username"
        onChange={(e) => {
          if (
            typeof inputOnchangeHandler === "function" &&
            isError != undefined
          ) {
            inputOnchangeHandler(e, inputName, isError);
          }
        }}
      />

      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
        {inputName}
      </span>
    </label>
  );
}
