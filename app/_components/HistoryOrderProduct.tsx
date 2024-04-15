import Image from 'next/image';
import { solidBlurDataUrl } from '../utils/utils';
import { PortableTextComponents, PortableText } from '@portabletext/react';
import React from 'react';

interface Props {
  product: {
    priceAtTheOrderTime: string;
    quantity: number;
    sanitySlug: string;
    titleAtTheOrderTime: string;
    imgUrl?: string | undefined;
    detail?: any;
  };
}

const myPortableTextComponents: PortableTextComponents | undefined = {
  block: {
    normal: ({ children }) => <p className="hidden md:block">{children}</p>,
  },
};

export default function HistoryOrderProduct({ product }: Props) {
  return (
    <li className="flex items-center gap-4 md:items-start">
      <Image
        src={product.imgUrl || solidBlurDataUrl}
        width={80}
        height={80}
        alt="order-history-image"
        className="h-[80px] w-[80px] rounded-md md:h-[160px] md:w-[160px]"
        placeholder="blur"
        blurDataURL={solidBlurDataUrl}
      />
      <div className="md:grow">
        <div className="flex flex-col gap-2 text-sm md:mb-2 md:flex-row md:justify-between md:text-base">
          <p className="font-medium text-gray-800">
            {product.titleAtTheOrderTime}
          </p>
          <p className="font-medium text-gray-800">
            ${product.priceAtTheOrderTime}
          </p>
        </div>
        {product.detail && (
          <PortableText
            value={product.detail}
            components={myPortableTextComponents}
          />
        )}
      </div>
    </li>
  );
}
