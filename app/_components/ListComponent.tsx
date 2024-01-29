'use client';
import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

interface Props {
  listComponentHandler?: (value: number) => void;
  selectedValue: number;
  listData: { id: number; value: string | number; link?: string }[];
}

export default function ListComponent({
  listComponentHandler,
  selectedValue,
  listData,
}: Props) {
  return (
    <Listbox
      defaultValue={selectedValue}
      as="div"
      className="relative"
      onChange={listComponentHandler}
    >
      <Listbox.Button className="focus:outline-non relative w-full cursor-default rounded-lg border border-gray-400 bg-white py-2 pl-3 pr-10 text-left">
        <p className="text-center text-sm font-medium text-gray-700">
          Quantity: {selectedValue}
        </p>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Listbox.Options className="absolute z-10 mt-1 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {listData.map(
            (ele: { id: number; value: number | string; link?: string }) => (
              <Listbox.Option
                as="div"
                key={ele.id}
                value={ele.value}
                className="block px-4 py-2 text-center text-gray-700 ui-active:bg-gray-50"
              >
                {ele.link ? (
                  <Link
                    href={ele.link}
                    className="relative block"
                    scroll={false}
                  >
                    <span className="absolute inset-y-0 right-0 hidden pr-2 ui-selected:flex ui-selected:items-center">
                      <CheckIcon className="aria-hidden h-5 w-5" />
                    </span>
                    {ele.value}
                  </Link>
                ) : (
                  <>
                    <span className="absolute inset-y-0 right-0 hidden pr-2 ui-selected:flex ui-selected:items-center">
                      <CheckIcon className="aria-hidden h-5 w-5" />
                    </span>
                    {ele.value}
                  </>
                )}
              </Listbox.Option>
            )
          )}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
