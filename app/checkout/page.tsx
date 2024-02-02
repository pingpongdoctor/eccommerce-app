'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../_components/PaymentForm';
import React, { useState, useEffect } from 'react';
import { baseUrl } from '../utils/baseUrl';
import { getProductsInCartFromClientSide } from '../_lib/getProductsInCartFromClientSide';
import { SanityDocument } from 'next-sanity';
import {
  PRODUCTS_QUERY_BY_SLUGS,
  PRODUCTS_QUERY_CUSTOMER_ALSO_BUY_IN_CART_PAGE,
} from '@/sanity/lib/queries';
import ShoppingCartList from '../_components/ShoppingCartList';
import OrderSummaryComponent from '../_components/OrderSummaryComponent';

import { client } from '@/sanity/lib/client';
import { useContext } from 'react';
import { globalStatesContext } from '../_components/GlobalStatesContext';
import ShoppingCartItemSkeleton from '../_components/ShoppingCartItemSkeleton';
import OrderSummarySkeleton from '../_components/OrderSummarySkeleton';
import { addProductImgUrls } from '../_lib/addProductImgUrls';
import { addProductQuantity } from '../_lib/addProductQuantity';
import ClientProductCards from '../_components/ClientProductCards';
import { calculateSubtotal } from '../_lib/calculateSubtotal';
import ProductCardsSkeleton from '../_components/ProductCardsSkeleton';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string>('');
  const { userProfile, changeProductsInCart, setChangeProductsInCart } =
    useContext(globalStatesContext);
  const [productsInCart, setProductsInCart] = useState<ProductInShoppingCart[]>(
    []
  );
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
          if (products.length > 0) {
            setProductsAlsoBuy(products);
          }
        });
    }
  }, [productsInCart]);

  useEffect(() => {
    if (productsInCart.length > 0 && sanityProductsInCart.length > 0) {
      // set the state for product with image url and quantity
      addProductImgUrls(sanityProductsInCart).then(
        (productsWithImgUrl: (ProductWithImgUrl & SanityDocument)[]) => {
          const productsWithImgAndQuantity = addProductQuantity(
            productsWithImgUrl,
            productsInCart
          );
          setProductsWithImgUrlAndQuantity(productsWithImgAndQuantity);
        }
      );

      //set subtotal state
      setSubtotal(calculateSubtotal(productsInCart, sanityProductsInCart));
    }
  }, [productsInCart, sanityProductsInCart]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${baseUrl}/api/checkout_sessions`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 100 }),
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            appearance: { theme: 'stripe' },
            clientSecret,
          }}
        >
          <PaymentForm
            subtotal={subtotal}
            productsWithImgUrlAndQuantity={productsWithImgUrlAndQuantity}
            isFetchingSanityProducts={isFetchingSanityProducts}
          />
        </Elements>
      )}
    </main>
  );
}
