'use client';
import { dropdownItemInforArr, menuListItems } from '../utils/utils';
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
import { useContext, useEffect, useState } from 'react';
import { navigationLinksInfor } from '../utils/utils';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { userProfile, isLoading, productsInCart, user } =
    useContext(globalStatesContext);
  const [isAdmin, setIsAdmin] = useState<null | boolean>(null);

  useEffect(() => {
    if (!isLoading && user) {
      const isAdmin: boolean | undefined =
        user?.[
          process.env.NEXT_PUBLIC_AUTH0_CUSTOM_ROLE_CLAIM as string
        ].includes('admin');

      setIsAdmin(isAdmin === undefined ? null : isAdmin);
    } else {
      setIsAdmin(null);
    }
  }, [user, isLoading]);

  //generate linksInfor
  const linksInfor: {
    id?: number;
    linkName?: string;
    className?: string;
    href?: string;
    classname?: string;
    dropDownComponent?: JSX.Element;
  }[] = [
    {
      id: 2,
      dropDownComponent: (
        <DropdownMenu key={2} dropdownItemInforArr={dropdownItemInforArr} />
      ),
    },
    ...navigationLinksInfor,
  ];

  //render link elements function
  const renderLinks = function (
    links: {
      id?: number;
      linkName?: string;
      className?: string;
      href?: string;
      classname?: string;
      dropDownComponent?: JSX.Element;
    }[]
  ) {
    return (
      links
        //filter to render admin or order elements based on isAdmin state
        .filter((link) => {
          const hiddenElementId = isAdmin ? 5 : 4;
          return link.id != hiddenElementId;
        })
        .map((link) => {
          if (link.id === 2) {
            return link.dropDownComponent;
          }
          return (
            <Link
              className={`${link.className as string} ${
                pathname.startsWith('/admin') ? 'hover:border-white' : ''
              }`}
              href={link.href as string}
              key={link.id}
            >
              {link.linkName}
            </Link>
          );
        })
    );
  };

  const pathname = usePathname();

  return (
    <div className={`${pathname.startsWith('/admin') ? 'bg-gray-900' : ''}`}>
      <div
        className={`mb-8 flex flex-col gap-2 p-4 text-sm text-gray-900 md:p-8 lg:mb-12 lg:p-12 xl:mx-auto xl:max-w-7xl ${
          pathname.startsWith('/admin') ? '!mb-0 bg-gray-900' : ''
        }`}
      >
        <nav
          className={`flex h-8 items-center justify-between overflow-visible ${
            pathname.startsWith('/admin') ? 'bg-gray-900' : 'bg-white'
          }`}
        >
          <Link href="/" className="-m-1.5 p-1.5">
            {pathname.startsWith('/admin') ? (
              <p className="font-dancingScript text-3xl font-bold text-white">
                Glowy
              </p>
            ) : (
              <Image
                className="h-20 w-auto md:h-28"
                src={glowlyLab}
                alt="logo"
                priority
                placeholder="blur"
              />
            )}
          </Link>

          {/* table and desktop navigation links */}
          <div
            className={`hidden items-center sm:flex sm:gap-6 lg:gap-12 xl:gap-16 [&>a]:font-semibold ${
              pathname.startsWith('/admin') ? 'bg-gray-900 text-white' : ''
            }`}
          >
            {renderLinks(linksInfor)}
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
                  menuItems={menuListItems}
                />
                <Link
                  href="/shopping-cart"
                  className="group flex items-end gap-1"
                >
                  <ShoppingBagIcon
                    className={`h-7 text-gray-400 transition-all group-hover:animate-pulse ${
                      pathname.startsWith('/admin')
                        ? 'group-hover:text-white'
                        : 'group-hover:text-gray-600'
                    }`}
                  />
                  <p
                    className={`text-lg font-medium text-gray-400 transition-all group-hover:animate-pulse group-hover:text-gray-600 ${
                      pathname.startsWith('/admin')
                        ? 'group-hover:text-white'
                        : 'group-hover:text-gray-600'
                    }`}
                  >
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
                color={pathname.startsWith('/admin') ? 'white' : 'black'}
                radius="9"
              />
            )}
          </div>
        </nav>

        {/* mobile navigation links */}
        <div
          className={`mx-auto mt-4 flex h-8 items-center gap-4 sm:hidden [&>a]:font-semibold ${
            pathname.startsWith('/admin') ? 'bg-gray-900 text-white' : ''
          }`}
        >
          {renderLinks(linksInfor)}
        </div>
      </div>
    </div>
  );
}
