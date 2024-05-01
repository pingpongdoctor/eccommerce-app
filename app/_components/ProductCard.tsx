import { SanityDocument } from 'next-sanity';
import Image from 'next/image';
import { solidBlurDataUrl } from '../utils/utils';
export default function ProductCard({
  product,
}: {
  product: ProductWithImgUrl & SanityDocument;
}) {
  return (
    <div className="group flex flex-col gap-2">
      <Image
        className="object-fit aspect-[1/1.2] w-full rounded-md object-cover object-center transition-all group-hover:opacity-90"
        src={product.imgUrl}
        alt="product-image"
        width={300}
        height={300}
        placeholder="blur"
        blurDataURL={solidBlurDataUrl}
      />

      <p className="line-clamp-2 h-12">
        {product.title ? product.title : 'No Title'}
      </p>

      <p className="text-lg text-gray-900">${product.price}</p>
    </div>
  );
}
