'use client';

import { SanityDocument } from 'next-sanity';
import ShoppingCartItem from './ShoppingCartItem';

interface Props {
  productsWithImgUrlAndQuantity: (ProductWithImgUrl &
    SanityDocument & { productQuantity: number })[];
  shoppingCartListClassname?: string;
}

export default function ShoppingCartList({
  productsWithImgUrlAndQuantity,
  shoppingCartListClassname,
}: Props) {
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
