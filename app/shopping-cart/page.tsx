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
import ClientProductCards from '../_components/ClientProductCards';
import { calculateSubtotal } from '../_lib/calculateSubtotal';
import ProductCardsSkeleton from '../_components/ProductCardsSkeleton';
import { useRouter } from 'next/navigation';

//get products that customers also buy
export default function ShoppingCart() {
  const router = useRouter();
  const { productsInCart, isLoading, user } = useContext(globalStatesContext);
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
  const [isAnyProductSoldOut, setIsAnyProductSoldOut] =
    useState<boolean>(false);

  //protect this page from unauthenticated users
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (productsInCart.length > 0) {
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

      setIsFetchingSanityProducts(true);

      //fetch product sanity documents
      client
        .fetch<(SanityProduct & SanityDocument)[]>(PRODUCTS_QUERY_BY_SLUGS, {
          slugArr: productSlugs,
        })
        .then((products: (SanityProduct & SanityDocument)[]) => {
          setSanityProductsInCart(products);
        })
        .catch((e: any) => {
          console.log(e.message);
        })
        .finally(() => {
          setIsFetchingSanityProducts(false);
        });

      //fetch product sanity documents that users might also like
      client
        .fetch<(SanityProduct & SanityDocument)[]>(
          PRODUCTS_QUERY_CUSTOMER_ALSO_BUY_IN_CART_PAGE,
          { categoryArr: productCategories, slugArr: productSlugs }
        )
        .then((products: (SanityProduct & SanityDocument)[]) => {
          if (products.length > 0) {
            setProductsAlsoBuy(products);
          }
        });
    } else {
      setSanityProductsInCart([]);
      setProductsAlsoBuy([]);
      setProductsWithImgUrlAndQuantity([]);
      setSubtotal(0);
    }
  }, [productsInCart]);

  useEffect(() => {
    if (productsInCart.length > 0 && sanityProductsInCart.length > 0) {
      // set the state for product with image url and quantity

      const productsWithImgUrl: (ProductWithImgUrl & SanityDocument)[] =
        addProductImgUrls(sanityProductsInCart);
      const productsWithImgAndQuantity = addProductQuantity(
        productsWithImgUrl,
        productsInCart
      );
      setProductsWithImgUrlAndQuantity(productsWithImgAndQuantity);

      //set subtotal state
      setSubtotal(calculateSubtotal(productsInCart, sanityProductsInCart));
    }
  }, [productsInCart, sanityProductsInCart]);

  //check if any product in cart is sold out
  useEffect(() => {
    if (sanityProductsInCart.length > 0) {
      sanityProductsInCart.map((product: SanityProduct & SanityDocument) => {
        if (product.instock === 0) {
          setIsAnyProductSoldOut(true);
        }
      });
    }
  }, [sanityProductsInCart]);

  return (
    <main className="min-h-[600px]">
      <h2 className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">Shopping Cart</h2>

      {/* products in cart */}
      <div className="mb-8 flex flex-col px-4 md:px-8 lg:mb-12 lg:flex-row lg:justify-between lg:px-12 xl:mx-auto xl:max-w-7xl">
        {/* skeleton components */}
        {isFetchingSanityProducts && (
          <>
            <div className="mb-8 *:mb-8 md:w-[35%] lg:mb-12">
              <ShoppingCartItemSkeleton />
              <ShoppingCartItemSkeleton />
            </div>
            <OrderSummarySkeleton />
          </>
        )}

        {!isFetchingSanityProducts &&
          productsWithImgUrlAndQuantity.length > 0 && (
            <>
              <ShoppingCartList
                productsWithImgUrlAndQuantity={productsWithImgUrlAndQuantity}
                shoppingCartListClassname="lg:w-[50%]"
              />
              <OrderSummaryComponent
                subtotal={subtotal}
                tax={Math.round((subtotal * 12) / 100)}
                shipping={Math.round((subtotal * 2) / 100)}
                orderSummaryComponentClassname="lg:w-[40%] mb-8 lg:mb-0"
                isAnyProductSoldOut={isAnyProductSoldOut}
              />
            </>
          )}

        {/* text shown when there is not product in cart */}
        {!isFetchingSanityProducts &&
          productsWithImgUrlAndQuantity.length === 0 && (
            <p>There are not any products in your cart</p>
          )}
      </div>

      {/* product you may like */}
      <div>
        {isFetchingSanityProducts && <ProductCardsSkeleton />}

        {!isFetchingSanityProducts && productsAlsoBuy.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
              <p className="text-lg font-medium text-gray-900">
                You may also like
              </p>
              <p className="font-medium text-gray-900">
                See all <span>&rarr;</span>
              </p>
            </div>

            <ClientProductCards products={productsAlsoBuy} />
          </>
        )}
      </div>
    </main>
  );
}
