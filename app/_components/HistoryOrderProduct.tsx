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

export default function HistoryOrderProduct({ product }: Props) {
  return (
    <li className="flex gap-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0 md:pb-8 lg:pb-12">
      <Image
        src={product.imgUrl || solidBlurDataUrl}
        width={80}
        height={80}
        alt="order-history-image"
        className="aspect-square grow rounded-md border object-cover"
        placeholder="blur"
        blurDataURL={solidBlurDataUrl}
      />

      <div className="flex w-[50%] flex-col gap-12 text-sm font-medium text-gray-800 sm:w-[65%] sm:text-base md:w-[70%] lg:text-lg">
        <div className="flex items-center justify-between gap-2">
          <p>{product.titleAtTheOrderTime}</p>
          <p>${product.priceAtTheOrderTime}</p>
        </div>

        <p>Quantity: {product.quantity}</p>
      </div>
    </li>
  );
}
