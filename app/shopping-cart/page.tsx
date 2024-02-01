'use client';
import { getProductsInCartFromClientSide } from '../_lib/getProductsInCartFromClientSide';
import { SanityDocument } from 'next-sanity';
import { PRODUCTS_QUERY_BY_SLUGS } from '@/sanity/lib/queries';
import ShoppingCartList from '../_components/ShoppingCartList';
import OrderSummaryComponent from '../_components/OrderSummaryComponent';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { useContext } from 'react';
import { globalStatesContext } from '../_components/GlobalStatesContext';
import ShoppingCartItemSkeleton from '../_components/ShoppingCartItemSkeleton';
import OrderSummarySkeleton from '../_components/OrderSummarySkeleton';

export default function ShoppingCart() {
  const { userProfile, changeProductsInCart, setChangeProductsInCart } =
    useContext(globalStatesContext);

  const [productsInCart, setProductsInCart] = useState<ProductInShoppingCart[]>(
    []
  );
  const [sanityProductsInCart, setSanityProductsInCart] = useState<
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
    }
  }, [productsInCart]);

  return (
    <main className="min-h-[600px]">
      <h2 className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">Shopping Cart</h2>

      <div className="flex flex-col px-4 md:px-8 lg:flex-row lg:justify-between lg:px-12 xl:mx-auto xl:max-w-7xl">
        {/* {isFetchingSanityProducts && (
          <div className="mb-8 *:mb-8 md:w-[35%] lg:mb-12">
            <ShoppingCartItemSkeleton />
            <ShoppingCartItemSkeleton />
          </div>
        )} */}

        {/* {sanityProductsInCart.length > 0 && !isFetchingSanityProducts && (
          <ShoppingCartList
            products={productsInCart}
            sanityProducts={sanityProductsInCart}
            shoppingCartListClassname="lg:w-[50%]"
          />
        )} */}

        {/* <ShoppingCartList
          products={productsInCart}
          sanityProducts={sanityProductsInCart}
          shoppingCartListClassname="lg:w-[50%]"
        /> */}

        <div className="mb-8 w-full *:mb-8 md:w-[50%] lg:mb-12">
          <ShoppingCartItemSkeleton />
          <ShoppingCartItemSkeleton />
        </div>

        {/* <OrderSummaryComponent orderSummaryComponentClassname="lg:w-[40%]" /> */}
        <OrderSummarySkeleton />
      </div>

      {sanityProductsInCart.length == 0 && !isFetchingSanityProducts && (
        <h2 className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          There are not any products in your cart
        </h2>
      )}
    </main>
  );
}
