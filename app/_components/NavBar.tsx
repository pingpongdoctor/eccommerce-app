'use client';

import { dropdownItemInforArr } from '../utils/utils';
import DropdownMenu from './DropdownMenu';
import Image from 'next/image';
import Link from 'next/link';
import glowlyLab from '../../public/assets/glowy-lab.png';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ArrowLongRightIcon } from '@heroicons/react/16/solid';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { getUserProfileFromClientSide } from '../_lib/getUserProfileFromClientSide';
import { useState, useEffect } from 'react';
import { User } from '@prisma/client';
import SimpleMenuComponent from './SimpleMenuComponent';
import { ThreeDots } from 'react-loader-spinner';
import { baseUrl } from '../utils/baseUrl';
import { getProductsInCartFromClientSide } from '../_lib/getProductsInCartFromClientSide';

export default function Navbar() {
  const [userProfile, setUserProfile] = useState<Omit<User, 'auth0Id'> | null>(
    null
  );

  const { user, isLoading } = useUser();
  const [products, setProducts] = useState<{ sanitySlug: string }[]>([]);

  useEffect(() => {
    if (user) {
      //get user profile
      getUserProfileFromClientSide()
        .then((userData: Omit<User, 'auth0Id'> | undefined) => {
          if (userData) {
            setUserProfile(userData);
          }
        })
        .catch((e: any) => {
          console.log('error fetching user data' + ' ' + e);
        });

      //get products in user cart
      getProductsInCartFromClientSide().then(
        (
          products:
            | {
                sanitySlug: string;
              }[]
            | undefined
        ) => {
          if (products) {
            setProducts(products);
          } else {
            setProducts([]);
          }
        }
      );
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

        <div className={`flex w-[102px] justify-end transition-all`}>
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
            <div className="flex items-center gap-4">
              <SimpleMenuComponent
                avatarSrc={userProfile.imgUrl}
                username={userProfile.name}
              />
              <div className="group flex items-end gap-1">
                <ShoppingBagIcon className="h-7 text-gray-400 transition-all group-hover:animate-pulse group-hover:text-gray-600" />
                <p className="text-lg font-medium text-gray-400 transition-all group-hover:animate-pulse group-hover:text-gray-600">
                  {products.length}
                </p>
              </div>
            </div>
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
