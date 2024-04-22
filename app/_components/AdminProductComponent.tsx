'use client';
import Image from 'next/image';
import { solidBlurDataUrl } from '../utils/utils';
import { PortableTextComponents, PortableText } from '@portabletext/react';

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

export default function AdminProductComponent({ product }: Props) {
  return (
    <li className="flex items-center gap-4 border-b border-gray-300 pb-4 last:border-b-0 last:pb-0 md:pb-8 lg:pb-12">
      <Image
        src={product.imgUrl || solidBlurDataUrl}
        width={80}
        height={80}
        alt="order-history-image"
        className="h-[160px] w-[160px] rounded-md"
        placeholder="blur"
        blurDataURL={solidBlurDataUrl}
      />
      <div className="flex h-[160px] grow flex-col justify-between">
        <div>
          <div className="mb-2 flex justify-between gap-2 text-sm">
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

        <p className="font-medium text-gray-800">
          Quantity: {product.quantity}
        </p>
      </div>
    </li>
  );
}
