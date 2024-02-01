'use client';

import { SanityDocument } from 'next-sanity';
import ShoppingCartItem from './ShoppingCartItem';
import { addProductImgUrls } from '../_lib/addProductImgUrls';
import { useState, useEffect } from 'react';

interface Props {
  sanityProducts: (SanityProduct & SanityDocument)[];
  products: ProductInShoppingCart[];
  shoppingCartListClassname?: string;
}

export default function ShoppingCartList({
  sanityProducts,
  products,
  shoppingCartListClassname,
}: Props) {
  const [productsWithImgUrlAndQuantity, setProductsWithImgUrlAndQuantity] =
    useState<
      (ProductWithImgUrl & SanityDocument & { productQuantity: number })[]
    >([]);

  // set img url and product quantity to sanity documents
  useEffect(() => {
    addProductImgUrls(sanityProducts).then(
      (productsWithImgUrl: (ProductWithImgUrl & SanityDocument)[]) => {
        const productsWithImgAndQuantity = [...productsWithImgUrl].map(
          (sanityProduct: ProductWithImgUrl & SanityDocument) => {
            for (let i = 0; i < products.length; i++) {
              if (sanityProduct.slug.current === products[i].productSlug) {
                sanityProduct.productQuantity = products[i].productQuantity;
              }
            }
            return sanityProduct as ProductWithImgUrl &
              SanityDocument & { productQuantity: number };
          }
        );
        setProductsWithImgUrlAndQuantity(productsWithImgAndQuantity);
      }
    );
  }, [products, sanityProducts]);

  return (
    <div className={`mb-8 *:mb-8 lg:mb-12 ${shoppingCartListClassname}`}>
      {productsWithImgUrlAndQuantity.map(
        (
          product: ProductWithImgUrl &
            SanityDocument & { productQuantity: number }
        ) => (
          <ShoppingCartItem key={product._id} product={product} />
        )
      )}
    </div>
  );
}
