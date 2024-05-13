import Image from 'next/image';
import { solidBlurDataUrl } from '../utils/utils';

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

      <div className="text- flex w-[50%] flex-col gap-12 text-sm sm:w-[65%] sm:text-base md:w-[70%] lg:text-lg">
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium text-gray-800">
            {product.titleAtTheOrderTime}
          </p>
          <p className="font-medium text-gray-800">
            ${product.priceAtTheOrderTime}
          </p>
        </div>

        <p className="font-medium text-gray-800">
          Quantity: {product.quantity}
        </p>
      </div>
    </li>
  );
}
