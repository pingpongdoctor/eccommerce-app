'use client';

import { dropdownItemInforArr } from '../utils/utils';
import DropdownMenu from './DropdownMenu';
import Image from 'next/image';
import Link from 'next/link';
import glowlyLab from '../../public/assets/glowy-lab.png';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  return (
    <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-2 p-4 text-sm text-gray-900 md:block md:p-8 lg:mb-12 lg:p-12">
      <nav className="flex h-8 items-center justify-between overflow-visible bg-white">
        <Link href="/" className="-m-1.5 p-1.5">
          <Image
            className="h-24 w-auto md:h-28"
            src={glowlyLab}
            alt="logo"
            priority
            placeholder="blur"
          />
        </Link>

        {/* table and desktop navigation links */}
        <div className="hidden items-center md:flex md:gap-10 lg:gap-12 xl:gap-16 [&>a]:font-semibold">
          <Link href="/">Home</Link>
          <DropdownMenu dropdownItemInforArr={dropdownItemInforArr} />
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {!user && (
          <Link href="/api/auth/login" className="font-semibold">
            Log in <span>&rarr;</span>
          </Link>
        )}
        {user && (
          <Link href="/api/auth/logout" className="font-semibold">
            Log out
          </Link>
        )}
      </nav>

      {/* mobile navigation links */}
      <div className="mx-auto flex gap-x-4 md:hidden [&>a]:font-semibold">
        <DropdownMenu dropdownItemInforArr={dropdownItemInforArr} />
        <Link href="#">Features</Link>
        <Link href="#">Marketplace</Link>
        <Link href="#">Company</Link>
      </div>
    </div>
  );
}
