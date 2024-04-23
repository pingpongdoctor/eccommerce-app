'use client';
import { Fragment, MouseEventHandler } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Avatar from './Avatar';
import { caplitalizeFirstLetterOfWords } from '../_lib/caplitalizeFirstLetterOfWords';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface Props {
  menuItems: {
    href?: string;
    label: string;
    simpleMenuOnclickHandler?: MouseEventHandler<HTMLAnchorElement>;
  }[];
  avatarSrc?: string;
  btnName?: string;
  btnClassname?: string;
  username?: string;
  postionClassname?: string;
  menuClassname?: string;
}

export default function SimpleMenuComponent({
  avatarSrc,
  username,
  menuItems,
  btnName,
  btnClassname,
  postionClassname,
  menuClassname,
}: Props) {
  return (
    <Menu as="div" className={`relative ${menuClassname}`}>
      <Menu.Button>
        {avatarSrc ? (
          <Avatar avatarSrc={avatarSrc} avatarClassname="size-10" />
        ) : (
          <div className={`flex ${btnClassname}`}>
            <p>{btnName}</p>
            <ChevronDownIcon className="h-6 w-6" />
          </div>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute right-0 top-11 z-20 flex w-40 origin-top-right flex-col rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none ${postionClassname}`}
        >
          {username && (
            <Menu.Item
              as="div"
              key="username"
              className="block truncate text-nowrap border-b px-4 py-2 font-semibold text-gray-700"
            >
              {username}
            </Menu.Item>
          )}

          {menuItems.map((menuItem) => (
            <Menu.Item
              as="a"
              key={menuItem.label}
              href={menuItem.href || '#'}
              className="block px-4 py-2 text-gray-700 ui-active:bg-gray-100"
              onClick={menuItem.simpleMenuOnclickHandler}
            >
              {caplitalizeFirstLetterOfWords(menuItem.label)}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
