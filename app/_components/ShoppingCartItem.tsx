import React from 'react';
import Image from 'next/image';
import { solidBlureDataUrl } from '../utils/utils';

interface Props {
  product: ProductWithImgUrl;
}

export default function ShoppingCartItem({ product }: Props) {
  return (
    <div>
      <Image
        src={product.imgUrl}
        placeholder="blur"
        blurDataURL={solidBlureDataUrl}
        priority
        alt="product-img-shopping-cart"
      />
      <p>{product.title}</p>
      <p>${product.price}</p>
    </div>
  );
}
