'use client';

import { dropdownItemInforArr } from '../utils/utils';
import DropdownMenu from './DropdownMenu';

export default function Navbar() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col p-4 md:block md:p-8 ">
      <nav className="flex items-center justify-between bg-white">
        <a href="#" className="-m-1.5 p-1.5">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </a>

        <ul className="hidden gap-x-12 md:flex">
          <DropdownMenu dropdownItemInforArr={dropdownItemInforArr} />
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            About
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Blog
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Contact
          </a>
        </ul>

        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
          Log in <span>&rarr;</span>
        </a>
      </nav>

      <ul className=":gap-x-8 mx-auto flex gap-x-4 md:hidden">
        <DropdownMenu dropdownItemInforArr={dropdownItemInforArr} />
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
          Features
        </a>
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
          Marketplace
        </a>
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
          Company
        </a>
      </ul>
    </div>
  );
}
