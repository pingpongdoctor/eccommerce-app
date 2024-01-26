'use client';

import { dropdownItemInforArr } from '../utils/utils';
import DropdownMenu from './DropdownMenu';
import Image from 'next/image';
import Link from 'next/link';
import glowlyLab from '../../public/assets/glowy-lab.png';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ArrowLongRightIcon } from '@heroicons/react/16/solid';
import { getUserProfile } from '../_lib/getUserProfile';
import { useState, useEffect } from 'react';
import { User } from '@prisma/client';
import SimpleMenuComponent from './SimpleMenuComponent';
import { ThreeDots } from 'react-loader-spinner';

export default function Navbar() {
  const [userProfile, setUserProfile] = useState<Omit<User, 'auth0Id'> | null>(
    null
  );

  const { user, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      getUserProfile()
        .then((userData: Omit<User, 'auth0Id'> | undefined) => {
          if (userData) {
            setUserProfile(userData);
          }
        })
        .catch((e: any) => {
          console.log('error fetching user data' + ' ' + e);
        });
    }
  }, [user]);

  return (
    <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-2 p-4 text-sm text-gray-900 md:block md:p-8 lg:mb-12 lg:p-12">
      <nav className="flex h-8 items-center justify-between overflow-visible bg-white">
        <Link href="/" className="-m-1.5 p-1.5">
          <Image
            className="h-20 w-auto md:h-28"
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
          <Link href="#">About</Link>
          <Link href="#">Blog</Link>
          <Link href="#">Contact</Link>
        </div>

        <div
          className={`flex w-auto justify-end transition-all md:w-[144px] md:items-center ${
            isLoading ? 'lg:justify-end' : 'lg:justify-between'
          }`}
        >
          {!userProfile && !isLoading && (
            <Link
              href="/api/auth/login"
              className="group relative ml-auto h-[25px] w-[88px] font-semibold"
            >
              <span className="group absolute left-0 top-0 z-[1] flex h-full w-full items-center justify-center gap-2 group-hover:text-white">
                <span>Log in</span>
                <span className="group-hover:hidden">&rarr;</span>
                <ArrowLongRightIcon className="hidden h-5 group-hover:block" />
              </span>

              <span className="absolute left-0 top-0 z-0 h-full w-0 rounded-lg bg-gray-900 transition-all group-hover:w-full"></span>
            </Link>
          )}

          {userProfile && !isLoading && (
            <SimpleMenuComponent
              avatarSrc={userProfile.imgUrl}
              username={userProfile.name}
            />
          )}

          {userProfile && !isLoading && (
            <Link
              href="/api/auth/logout"
              className="group relative hidden h-[25px] w-[88px] font-semibold md:block"
            >
              <span className="group absolute left-0 top-0 z-[1] flex h-full w-full items-center justify-center gap-2 group-hover:text-white">
                <span>Log out</span>
                <span className="group-hover:hidden">&rarr;</span>
                <ArrowLongRightIcon className="hidden h-5 group-hover:block" />
              </span>

              <span className="absolute left-0 top-0 z-0 h-full w-0 rounded-lg bg-gray-900 transition-all group-hover:w-full"></span>
            </Link>
          )}

          {isLoading && (
            <ThreeDots
              visible={true}
              height="50"
              width="50"
              color="black"
              radius="9"
            />
          )}
        </div>
      </nav>

      {/* mobile navigation links */}
      <div className="mx-auto flex items-center gap-6 md:hidden [&>a]:font-semibold">
        <DropdownMenu dropdownItemInforArr={dropdownItemInforArr} />
        <Link href="#">Features</Link>
        <Link href="#">Marketplace</Link>
        <Link href="#">Company</Link>
      </div>
    </div>
  );
}
