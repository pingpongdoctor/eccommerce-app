'use client';
import { Fragment, MouseEvent } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Avatar from './Avatar';

interface Props {
  menuItems: {
    href?: string;
    label: string;
    classname?: string;
    simpleMenuOnclickHandler?: (e: MouseEvent<HTMLAnchorElement>) => void;
  }[];
  avatarSrc?: string;
  btnName?: string;
  btnClassname?: string;
  username?: string;
}

export default function SimpleMenuComponent({
  avatarSrc,
  username,
  menuItems,
  btnName,
  btnClassname,
}: Props) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        {avatarSrc ? (
          <Avatar avatarSrc={avatarSrc} avatarClassname="size-10" />
        ) : (
          <p className={btnClassname}>{btnName}</p>
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
        <Menu.Items className="absolute right-0 top-11 z-20 flex w-40 origin-top-right flex-col rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
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
              href={menuItem.href || 'javascript:void(0)'} //if there is not href, set javascript:void(0) to prevent refreshing the page and scrolling to the top
              className={
                menuItem.classname ||
                'block px-4 py-2 text-gray-700 ui-active:bg-gray-50'
              }
              onClick={menuItem.simpleMenuOnclickHandler}
            >
              {menuItem.label}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
