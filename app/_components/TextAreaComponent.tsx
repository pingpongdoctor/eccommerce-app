'use client';

import React, { ChangeEvent } from 'react';

interface Props {
  textareaId: string;
  textareaClassname?: string;
  textareaPlaceholder: string;
  textareaChangeEventHanlder?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextAreaComponent({
  textareaChangeEventHanlder,
  textareaId,
  textareaClassname,
  textareaPlaceholder = '',
}: Props) {
  return (
    <label
      htmlFor={textareaId}
      className={`relative block w-full rounded-md border border-gray-400 shadow-sm ${textareaClassname}`}
    >
      <textarea
        onChange={textareaChangeEventHanlder}
        maxLength={200}
        placeholder={textareaPlaceholder}
        id={textareaId}
        className={`peer h-[140px] w-full resize-none rounded-md border-none px-3 py-3 placeholder:text-transparent focus:outline-none focus:ring-0 sm:h-[130px] md:h-[100px] lg:h-[160px]`}
      />
      <span className="pointer-events-none absolute start-3 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-600">
        {textareaPlaceholder}
      </span>
    </label>
  );
}
