'use client';
import { SanityDocument } from 'next-sanity';
import {
  PRODUCTS_QUERY_BY_SLUGS,
  PRODUCTS_QUERY_CUSTOMER_ALSO_BUY_IN_CART_PAGE,
} from '@/sanity/lib/queries';
import ShoppingCartList from '../_components/ShoppingCartList';
import OrderSummaryComponent from '../_components/OrderSummaryComponent';
import { useEffect, useState, useContext } from 'react';
import { client } from '@/sanity/lib/client';
import { globalStatesContext } from '../_components/GlobalStatesContext';
import ShoppingCartItemSkeleton from '../_components/ShoppingCartItemSkeleton';
import OrderSummarySkeleton from '../_components/OrderSummarySkeleton';
import { addProductImgUrls } from '../_lib/addProductImgUrls';
import { addProductQuantity } from '../_lib/addProductQuantity';
import ProductCardsClientComponent from '../_components/ProductCardsClientComponent';
import { calculateSubtotal } from '../_lib/calculateSubtotal';
import ProductCardsSkeleton from '../_components/ProductCardsSkeleton';
import GoBackBtn from '../_components/GoBackBtn';
import Link from 'next/link';

export default function ShoppingCart() {
  const { productsInCart } = useContext(globalStatesContext);
  const [sanityProductsInCart, setSanityProductsInCart] = useState<
    (SanityProduct & SanityDocument)[]
  >([]);
  const [productsWithImgUrlAndQuantity, setProductsWithImgUrlAndQuantity] =
    useState<
      (ProductWithImgUrl & SanityDocument & { productQuantity: number })[]
    >([]);
  const [productsAlsoBuy, setProductsAlsoBuy] = useState<
    (SanityProduct & SanityDocument)[]
  >([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [isFetchingSanityProducts, setIsFetchingSanityProducts] =
    useState<boolean>(false);

  const handleClearAllStates = function () {
    setSanityProductsInCart([]);
    setProductsAlsoBuy([]);
    setProductsWithImgUrlAndQuantity([]);
    setSubtotal(0);
  };

  //set sanityProductInCart and productAlsoBuy states
  useEffect(() => {
    try {
      if (productsInCart.length > 0) {
        // only show skeleton component when page is initially rendered
        if (sanityProductsInCart.length === 0) {
          setIsFetchingSanityProducts(true);
        }

        const productSlugs: string[] = productsInCart
          ? [...productsInCart].map((product: ProductInShoppingCart) => {
              return product.productSlug;
            })
          : [];

        const productCategories: Categories[] = productsInCart
          ? [...productsInCart].map(
              (product: ProductInShoppingCart) => product.productCategory
            )
          : [];

        client
          .fetch<(SanityProduct & SanityDocument)[]>(PRODUCTS_QUERY_BY_SLUGS, {
            slugArr: productSlugs,
          })
          .then((products: (SanityProduct & SanityDocument)[]) => {
            setSanityProductsInCart(products);
          })
          .catch((e: any) => {
            //rethrow error so that it can be caught in the surrounding catch block and hault the code execution
            throw new Error(e.message);
          });

        client
          .fetch<(SanityProduct & SanityDocument)[]>(
            PRODUCTS_QUERY_CUSTOMER_ALSO_BUY_IN_CART_PAGE,
            { categoryArr: productCategories, slugArr: productSlugs }
          )
          .then((products: (SanityProduct & SanityDocument)[]) => {
            if (products.length > 0) {
              setProductsAlsoBuy(products);
            }
          })
          .catch((e: any) => {
            throw new Error(e.message);
          });
      } else {
        handleClearAllStates();
      }
    } catch (e: any) {
      console.log(
        'Error when setting sanityProductsIncCart and productAlsoBuy states' + e
      );
      handleClearAllStates();
    } finally {
      //set this state to false if its value is true
      setIsFetchingSanityProducts(false);
    }
  }, [productsInCart]);

  // set product with image url and quantity state and subtotal state
  useEffect(() => {
    try {
      if (productsInCart.length > 0 && sanityProductsInCart.length > 0) {
        const productsWithImgUrl: (ProductWithImgUrl & SanityDocument)[] =
          addProductImgUrls(sanityProductsInCart);
        const productsWithImgAndQuantity = addProductQuantity(
          productsWithImgUrl,
          productsInCart
        );
        setProductsWithImgUrlAndQuantity(productsWithImgAndQuantity);
        setSubtotal(calculateSubtotal(productsInCart, sanityProductsInCart));
      }
    } catch (e: any) {
      console.log(
        'Error when setting the productsWithImgUrlAndQuantity and subtotal states'
      );
      handleClearAllStates();
    }
  }, [productsInCart, sanityProductsInCart]);

  return (
    <main className="min-h-[600px]">
      <GoBackBtn goBackBtnClassname="text-gray-700 mb-4 mx-auto max-w-7xl px-4 md:px-8 lg:px-12" />
      <h2 className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">Shopping Cart</h2>
      {/* products in cart */}
      <div className="mb-8 flex flex-col px-4 md:px-8 lg:mb-12 lg:flex-row lg:justify-between lg:px-12 xl:mx-auto xl:max-w-7xl">
        {/* skeleton components */}
        {isFetchingSanityProducts ? (
          <>
            <div className="mb-8 *:mb-8 md:w-[35%] lg:mb-12">
              <ShoppingCartItemSkeleton />
              <ShoppingCartItemSkeleton />
            </div>
            <OrderSummarySkeleton />
          </>
        ) : productsWithImgUrlAndQuantity.length > 0 ? (
          <>
            <ShoppingCartList
              productsWithImgUrlAndQuantity={productsWithImgUrlAndQuantity}
              shoppingCartListClassname="lg:w-[50%]"
            />
            <OrderSummaryComponent
              subtotal={subtotal}
              tax={Math.round((subtotal * 10) / 100)}
              shipping={Math.round((subtotal * 10) / 100)}
              orderSummaryComponentClassname="lg:w-[40%] mb-8 lg:mb-0"
            />
          </>
        ) : (
          <p>There are not any products in your cart</p>
        )}
      </div>

      {/* product you may like */}
      <div>
        {isFetchingSanityProducts ? (
          <ProductCardsSkeleton />
        ) : (
          productsAlsoBuy.length > 0 && (
            <div>
              <div className="mb-6 flex items-center justify-between px-4 font-medium text-gray-900 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
                <p className="text-xl">You may also like</p>
                <Link
                  href="/product"
                  className="group flex cursor-default justify-start gap-1"
                >
                  <span> See all </span>
                  <span className="transition-all duration-500 group-hover:translate-x-2">
                    &rarr;
                  </span>
                </Link>
              </div>

              <ProductCardsClientComponent products={productsAlsoBuy} />
            </div>
          )
        )}
      </div>
    </main>
  );
}
