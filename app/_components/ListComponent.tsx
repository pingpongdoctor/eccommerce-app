'use client';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface Props {
  listComponentChangeEventHandler?: (value: number) => void;
  listComponentClickEventHandler?: (quantity: number) => void;
  selectedValue: number;
  listData: { id: number; value: number }[];
  listClassname?: string;
  listButtonClassname?: string;
}

export default function ListComponent({
  listComponentChangeEventHandler,
  listComponentClickEventHandler,
  selectedValue,
  listData,
  listClassname,
  listButtonClassname,
}: Props) {
  return (
    <Listbox
      defaultValue={1}
      as="div"
      className="relative"
      onChange={listComponentChangeEventHandler}
    >
      <Listbox.Button
        className={`focus:outline-non relative w-full min-w-[75px] cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left ${listButtonClassname}`}
      >
        <p className="text-center text-sm font-medium text-gray-700">
          {selectedValue}
        </p>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Listbox.Options
          className={`absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm ${listClassname}`}
        >
          {listData.map((ele: { id: number; value: number }) => (
            <Listbox.Option
              as="div"
              key={ele.id}
              value={ele.value}
              className="block cursor-default px-4 py-2 text-center text-gray-700 ui-active:bg-gray-50"
              onClick={() => {
                if (typeof listComponentClickEventHandler == 'function') {
                  listComponentClickEventHandler(ele.value);
                }
              }}
            >
              {ele.value}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
