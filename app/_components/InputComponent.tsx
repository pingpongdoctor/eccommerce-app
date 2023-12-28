"use client";
import React, { ChangeEvent } from "react";

interface Props {
  inputOnchangeHandler?: (
    e: ChangeEvent<HTMLInputElement>,
    updatedField: Field,
    isError: boolean,
  ) => void;
  inputName: Field;
  inputClassname?: string;
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
      className={`relative block w-full rounded-md border ${
        isError ? "border-red-300" : ""
      } border-gray-200 shadow-sm focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-600`}
    >
      <input
        type="text"
        id={inputName}
        className={`peer w-full rounded-md border-none px-3 py-3 placeholder-transparent outline-none ring-0 focus:border-transparent `}
        placeholder="Username"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (
            typeof inputOnchangeHandler === "function" &&
            isError != undefined
          ) {
            inputOnchangeHandler(e, inputName, isError);
          }
        }}
      />

      <span className="pointer-events-none absolute start-3 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
        {inputName}
      </span>
    </label>
  );
}
