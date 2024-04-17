'use client';
import { dropdownItemInforArr } from '../utils/utils';
import DropdownMenu from './DropdownMenu';
import Image from 'next/image';
import Link from 'next/link';
import glowlyLab from '../../public/assets/glowy-lab.png';
import { ArrowLongRightIcon } from '@heroicons/react/16/solid';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import SimpleMenuComponent from './SimpleMenuComponent';
import { ThreeDots } from 'react-loader-spinner';
import { globalStatesContext } from './GlobalStatesContext';
import { calculateTotalProducts } from '../_lib/calculateTotalProducts';
import { useContext } from 'react';

export default function Navbar() {
  const { userProfile, isLoading, productsInCart } =
    useContext(globalStatesContext);

  const linkClassname =
    'transition-all hover:border-b-2 hover:border-gray-900 hover:pb-[2px] hover:pt-[4px]';

  const navigationLinksInfor = [
    {
      id: 1,
      linkName: 'Home',
      className: linkClassname,
      href: '/',
    },
    {
      id: 2,
      dropDownComponent: (
        <DropdownMenu key={2} dropdownItemInforArr={dropdownItemInforArr} />
      ),
    },
    {
      id: 3,
      linkName: 'Blogs',
      className: linkClassname,
      href: '/blog',
    },
    {
      id: 4,
      linkName: 'Contact',
      className: linkClassname,
      href: '/beta-page',
    },
    {
      id: 5,
      linkName: 'Order History',
      className: linkClassname,
      href: '/order-history',
    },
  ];

  return (
    <div className="mb-8 flex flex-col gap-2 p-4 text-sm text-gray-900 md:block md:p-8 lg:mb-12 lg:p-12 xl:mx-auto xl:max-w-7xl">
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
        <div className="hidden items-center sm:flex sm:gap-10 lg:gap-12 xl:gap-16 [&>a]:font-semibold">
          {navigationLinksInfor.map((navigationLinkInfor) => {
            if (navigationLinkInfor.id === 2) {
              return navigationLinkInfor.dropDownComponent;
            }
            return (
              <Link
                className={navigationLinkInfor.className as string}
                href={navigationLinkInfor.href as string}
                key={navigationLinkInfor.id}
              >
                {navigationLinkInfor.linkName}
              </Link>
            );
          })}
        </div>

        <div className={`flex w-[109px] justify-end transition-all`}>
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
              <Link
                href="/shopping-cart"
                className="group flex items-end gap-1"
              >
                <ShoppingBagIcon className="h-7 text-gray-400 transition-all group-hover:animate-pulse group-hover:text-gray-600" />
                <p className="text-lg font-medium text-gray-400 transition-all group-hover:animate-pulse group-hover:text-gray-600">
                  {productsInCart.length > 0
                    ? calculateTotalProducts(productsInCart)
                    : 0}
                </p>
              </Link>
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
      <div className="mx-auto flex items-center gap-8 sm:hidden [&>a]:font-semibold">
        {navigationLinksInfor.map((navigationLinkInfor) => {
          if (navigationLinkInfor.id === 2) {
            return navigationLinkInfor.dropDownComponent;
          }
          return (
            <Link
              className={navigationLinkInfor.className}
              href={navigationLinkInfor.href as string}
              key={navigationLinkInfor.id}
            >
              {navigationLinkInfor.linkName}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
