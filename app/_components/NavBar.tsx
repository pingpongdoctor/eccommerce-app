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
import { client } from '@/sanity/lib/client';
import { PRODUCT_QUERY } from '@/sanity/lib/queries';
import { SanityDocument } from 'next-sanity';

export default function Navbar() {
  const { userProfile, isLoading, productsInCart } =
    useContext(globalStatesContext);

  const filterOutSoldOutProducts = function (
    products: ProductInShoppingCart[]
  ) {
    const notSoldOutProducts = Promise.all(
      products.map(async (product: ProductInShoppingCart) => {
        const sanityProductDocument = await client.fetch<
          SanityProduct & SanityDocument
        >(
          PRODUCT_QUERY,
          { slug: product.productSlug },
          {
            next: { tags: ['post'], revalidate: 3600 },
          }
        );
      })
    );
  };

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
        <div className="hidden items-center md:flex md:gap-10 lg:gap-12 xl:gap-16 [&>a]:font-semibold">
          <Link href="/">Home</Link>
          <DropdownMenu dropdownItemInforArr={dropdownItemInforArr} />
          <Link href="#">About</Link>
          <Link href="#">Blog</Link>
          <Link href="#">Contact</Link>
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
      <div className="mx-auto flex items-center gap-6 md:hidden [&>a]:font-semibold">
        <DropdownMenu dropdownItemInforArr={dropdownItemInforArr} />
        <Link href="#">Features</Link>
        <Link href="#">Marketplace</Link>
        <Link href="#">Company</Link>
      </div>
    </div>
  );
}
