'use client';

import { dropdownItemInforArr } from '../utils/utils';
import DropdownMenu from './DropdownMenu';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-2 p-4 sm:block sm:p-8 ">
      <nav className="flex h-8 items-center justify-between overflow-visible bg-white">
        <Link href="#" className="-m-1.5 p-1.5">
          <Image
            className="h-24 w-auto sm:h-28"
            src="/assets/glowy-lab.svg"
            alt="logo"
            width={100}
            height={100}
            priority={true}
          />
        </Link>

        {/* table and desktop navigation links */}
        <div className="hidden sm:flex sm:gap-x-8 md:gap-10 xl:gap-12">
          <Link
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Home
          </Link>
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
        </div>

        <Link
          href="#"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Log in <span>&rarr;</span>
        </Link>
      </nav>

      {/* mobile navigation links */}
      <div className="mx-auto flex gap-x-4 sm:hidden">
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
      </div>
    </div>
  );
}
