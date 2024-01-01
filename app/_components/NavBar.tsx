'use client';

import { dropdownItemInforArr } from '../utils/utils';
import DropdownMenu from './DropdownMenu';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-2 p-4 md:block md:p-8 ">
      <nav className="flex h-8 items-center justify-between overflow-visible bg-white">
        <Link href="#" className="-m-1.5 p-1.5">
          <Image
            className="h-24 w-auto md:h-28"
            src="/assets/glowy-lab.svg"
            alt="logo"
            width={100}
            height={100}
            priority={true}
          />
        </Link>

        {/* table and desktop navigation links */}
        <ul className="hidden gap-x-12 md:flex">
          <DropdownMenu dropdownItemInforArr={dropdownItemInforArr} />
          <Link
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Blog
          </Link>
          <Link
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Contact
          </Link>
        </ul>

        <Link
          href="#"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Log in <span>&rarr;</span>
        </Link>
      </nav>

      {/* mobile navigation links */}
      <ul className=":gap-x-8 mx-auto flex gap-x-4 md:hidden">
        <DropdownMenu dropdownItemInforArr={dropdownItemInforArr} />
        <Link
          href="#"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Features
        </Link>
        <Link
          href="#"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Marketplace
        </Link>
        <Link
          href="#"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Company
        </Link>
      </ul>
    </div>
  );
}
