'use client';
import { getProductsInCartFromClientSide } from '../_lib/getProductsInCartFromClientSide';
import { SanityDocument } from 'next-sanity';
import {
  PRODUCTS_QUERY_BY_SLUGS,
  PRODUCTS_QUERY_CUSTOMER_ALSO_BUY_IN_CART_PAGE,
} from '@/sanity/lib/queries';
import ShoppingCartList from '../_components/ShoppingCartList';
import OrderSummaryComponent from '../_components/OrderSummaryComponent';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { useContext } from 'react';
import { globalStatesContext } from '../_components/GlobalStatesContext';
import ShoppingCartItemSkeleton from '../_components/ShoppingCartItemSkeleton';
import OrderSummarySkeleton from '../_components/OrderSummarySkeleton';

//get products that customers also buy
export default function ShoppingCart() {
  const { userProfile, changeProductsInCart, setChangeProductsInCart } =
    useContext(globalStatesContext);
  const [productsInCart, setProductsInCart] = useState<ProductInShoppingCart[]>(
    []
  );
  const [sanityProductsInCart, setSanityProductsInCart] = useState<
    (SanityProduct & SanityDocument)[]
  >([]);
  const [productsAlsoBuy, setProductsAlsoBuy] = useState<
    (SanityProduct & SanityDocument)[]
  >([]);
  const [isFetchingSanityProducts, setIsFetchingSanityProducts] =
    useState<boolean>(true);

  //get products in shopping cart of the current user
  useEffect(() => {
    if (userProfile) {
      getProductsInCartFromClientSide()
        .then((productsInCart: ProductInShoppingCart[] | undefined) => {
          if (productsInCart) {
            setProductsInCart(productsInCart);
          }
        })
        .catch((e: any) => {
          console.log(e.message);
        })
        .finally(setChangeProductsInCart(false));
    }
  }, [userProfile, changeProductsInCart]);

  //get product sanity documents
  useEffect(() => {
    if (productsInCart.length > 0) {
      const productSlugs: string[] = productsInCart
        ? productsInCart.map(
            (product: ProductInShoppingCart) => product.productSlug
          )
        : [];

      const productCategories: Categories[] = productsInCart
        ? productsInCart.map(
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
          console.log(e.message);
        })
        .finally(() => {
          setIsFetchingSanityProducts(false);
        });

      client
        .fetch<(SanityProduct & SanityDocument)[]>(
          PRODUCTS_QUERY_CUSTOMER_ALSO_BUY_IN_CART_PAGE,
          { categoryArr: productCategories, slugArr: productSlugs }
        )
        .then((products: (SanityProduct & SanityDocument)[]) => {
          console.log(products);
        });
    }
  }, [productsInCart]);

  return (
    <main className="min-h-[600px]">
      <h2 className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">Shopping Cart</h2>

      {/* products in cart */}
      <div className="flex flex-col px-4 md:px-8 lg:flex-row lg:justify-between lg:px-12 xl:mx-auto xl:max-w-7xl">
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

        {sanityProductsInCart.length > 0 && !isFetchingSanityProducts && (
          <>
            <ShoppingCartList
              products={productsInCart}
              sanityProducts={sanityProductsInCart}
              shoppingCartListClassname="lg:w-[50%]"
            />
            <OrderSummaryComponent orderSummaryComponentClassname="lg:w-[40%]" />
          </>
        )}

        {/* text shown when there is not product in cart */}
        {sanityProductsInCart.length == 0 && !isFetchingSanityProducts && (
          <h2>There are not any products in your cart</h2>
        )}
      </div>

      {/* product you may like */}

      <div className="mb-6 flex items-center justify-between px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
        <p className="text-lg font-medium text-gray-900">You may also like</p>
        <p className="font-medium text-gray-900">
          See all <span>&rarr;</span>
        </p>
      </div>
    </main>
  );
}
