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
        className="object-fit aspect-[1/1.2] h-auto w-full rounded-xl object-cover object-center transition-all hover:opacity-90"
        src={product.imgUrl}
        alt="product-image"
        width={300}
        height={300}
        // placeholder="blur"
        // blurDataURL={product.imgBase64Url}
      />

      <p>{product.title ? product.title : 'No Title'}</p>

      <p className="text-lg font-[400] text-gray-900">$599</p>
    </div>
  );
}
