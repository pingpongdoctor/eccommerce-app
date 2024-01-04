import React from 'react';
import { SanityDocument } from 'next-sanity';
import Image from 'next/image';

export default async function ProductCard({
  product,
}: {
  product: SanityDocument;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Image
        className="object-fit aspect-[1/1.2] h-auto w-full rounded-lg object-cover object-center"
        src={product.imgUrl}
        alt="product-image"
        width={300}
        height={300}
        placeholder="blur"
        blurDataURL={product.imgBase64Url}
      />

      <p>{product.title ? product.title : 'No Title'}</p>

      <p className="text-lg font-[400]">$599</p>
    </div>
  );
}
