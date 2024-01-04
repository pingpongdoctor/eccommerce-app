import React from 'react';
import { SanityDocument } from 'next-sanity';
import ButtonComponent from './ButtonComponent';
import Image from 'next/image';
import { builder } from '../utils/imageBuilder';

export default function ProductCard({ product }: { product: SanityDocument }) {
  return (
    <div className="flex flex-col">
      {product?.mainImage?.length > 0 ? (
        <Image
          className="object-fit aspect-square h-auto w-full rounded-lg"
          src={builder.image(product.mainImage[0]).quality(80).url()}
          alt="product image"
          width={300}
          height={300}
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center">
          No image found
        </div>
      )}

      <p className="mb-2">{product.title ? product.title : 'No Title'}</p>

      <p className="font-semibold">$599</p>
    </div>
  );
}
