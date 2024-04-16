'use client';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import DropdownItem from './DropdownItem';

interface Props {
  dropdownItemInforArr: DropdownItemInfor[];
}

export default function DropdownMenu({ dropdownItemInforArr }: Props) {
  return (
    <Popover.Group>
      <Popover className="group relative z-[60]">
        <Popover.Button className="flex cursor-default items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none">
          <span className="transition-all group-hover:border-b-2 group-hover:border-gray-800 group-hover:pb-[2px] group-hover:pt-[4px]">
            Categories
          </span>
          <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-[65vw] overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:w-[25rem] md:w-[28rem]">
            {({ close }) => (
              <div
                className="p-4"
                onMouseLeave={() => {
                  close();
                }}
              >
                {dropdownItemInforArr.map(
                  (dropdownItemInfor: DropdownItemInfor) => (
                    <DropdownItem
                      key={dropdownItemInfor.name}
                      DropdownIcon={dropdownItemInfor.icon}
                      dropdownName={dropdownItemInfor.name}
                      dropdownDescription={dropdownItemInfor.description}
                      dropdownPath={dropdownItemInfor.path}
                      dropdownClickEventHanlder={() => {
                        close();
                      }}
                    />
                  )
                )}
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </Popover.Group>
  );
}
