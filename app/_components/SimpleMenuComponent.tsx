import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Avatar from './Avatar';

const links = [
  {
    href: '/order-history',
    label: 'Your orders',
    classname: 'ui-active:bg-gray-50 block px-4 py-2 text-gray-700',
  },
  {
    href: '/api/auth/logout',
    label: 'Log out',
    classname: 'ui-active:bg-gray-50 px-4 py-2 text-gray-700',
  },
];

interface Props {
  avatarSrc: string;
  username: string;
}

export default function SimpleMenuComponent({ avatarSrc, username }: Props) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <Avatar avatarSrc={avatarSrc} avatarClassname="size-10" />
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
          <Menu.Item
            as="div"
            key="username"
            className="block truncate text-nowrap border-b px-4 py-2 font-semibold text-gray-700"
          >
            {username}
          </Menu.Item>

          {links.map((link) => (
            <Menu.Item
              as="a"
              key={link.label}
              href={link.href}
              className={link.classname}
            >
              {link.label}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
