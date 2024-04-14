import Image from 'next/image';
import { solidBlurDataUrl } from '../utils/utils';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  product: {
    sanitySlug: string;
    title: string;
    imgUrl: string;
    description: string;
  };
  priceAtTheOrderTime: string;
  quantity: number;
}

export default function HistoryOrderProduct({
  product,
  priceAtTheOrderTime,
  quantity,
}: Props) {
  return (
    <div className="p-4 pt-0 md:p-8 md:pt-0 lg:p-12 lg:pt-0">
      <div className="mb-4 flex items-center gap-4 md:items-start">
        <Image
          src={product.imgUrl}
          width={80}
          height={80}
          alt="order-history-image"
          className="h-[80px] w-[80px] rounded-md md:h-[160px] md:w-[160px]"
          placeholder="blur"
          blurDataURL={solidBlurDataUrl}
        />
        <div className="md:grow">
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-800 md:mb-2 md:flex-row md:justify-between">
            <p>{product.title}</p>
            <p>${priceAtTheOrderTime}</p>
          </div>
          <p className="hidden md:block">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
