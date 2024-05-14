'use client';
import Image from 'next/image';
import { solidBlurDataUrl } from '../utils/utils';

interface Props {
  product: {
    priceAtTheOrderTime: string;
    quantity: number;
    sanitySlug: string;
    titleAtTheOrderTime: string;
    imgUrl?: string | undefined;
  };
}

export default function AdminProductComponent({ product }: Props) {
  return (
    <li className="border-white-300 flex gap-4 border-b pb-4 text-white first:pt-2 last:border-b-0 last:pb-0 md:pb-8 first:md:pt-4 lg:pb-12 first:lg:pt-6">
      <Image
        src={product.imgUrl || solidBlurDataUrl}
        width={80}
        height={80}
        alt="order-history-image"
        className="aspect-square grow rounded-md border object-cover"
        placeholder="blur"
        blurDataURL={solidBlurDataUrl}
      />

      <div className="flex w-[50%] flex-col gap-12 text-sm font-medium sm:w-[65%] sm:text-base md:w-[70%] lg:text-lg">
        <div className="flex items-center justify-between gap-2">
          <p>{product.titleAtTheOrderTime}</p>
          <p>${product.priceAtTheOrderTime}</p>
        </div>

        <p>Quantity: {product.quantity}</p>
      </div>
    </li>
  );
}
