'use client';
import { getProductsInCartFromServer } from '../_lib/getProductsInCartFromServer';
import { SanityDocument } from 'next-sanity';
import { PRODUCTS_QUERY_BY_SLUGS } from '@/sanity/lib/queries';
import ShoppingCartList from '../_components/ShoppingCartList';
import OrderSummaryComponent from '../_components/OrderSummaryComponent';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { useContext } from 'react';
import { globalStatesContext } from '../_components/GlobalStatesContext';

export default function ShoppingCart() {
  const { userProfile } = useContext(globalStatesContext);
  const [productsInCart, setProductsInCart] = useState<ProductInShoppingCart[]>(
    []
  );
  const [sanityProductsInCart, setSanityProductsInCart] = useState<
    (SanityProduct & SanityDocument)[]
  >([]);

  useEffect(() => {
    if (userProfile) {
      //get products in shopping cart of the current user
      getProductsInCartFromServer()
        .then((productsInCart: ProductInShoppingCart[] | undefined) => {
          if (productsInCart) {
            setProductsInCart(productsInCart);
          }
        })
        .catch((e: any) => {
          console.log(e.message);
        });
    }
  }, [userProfile]);

  useEffect(() => {
    if (productsInCart.length > 0) {
      //get product sanity documents
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
        });
    }
  }, [productsInCart]);

  return (
    <main>
      <h2 className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">Shopping Cart</h2>

      <ShoppingCartList
        products={productsInCart}
        sanityProducts={sanityProductsInCart}
      />

      <OrderSummaryComponent />
    </main>
  );
}
