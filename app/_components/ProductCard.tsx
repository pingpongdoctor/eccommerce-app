import { SanityDocument } from 'next-sanity';
import Image from 'next/image';
import { solidBlureDataUrl } from '../utils/utils';
export default function ProductCard({
  product,
}: {
  product: ProductWithImgUrl & SanityDocument;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Image
        className="object-fit aspect-[1/1.2] w-full rounded-md object-cover object-center transition-all hover:opacity-90"
        src={product.imgUrl}
        alt="product-image"
        width={300}
        height={300}
        placeholder="blur"
        blurDataURL={solidBlureDataUrl}
      />

      <p>{product.title ? product.title : 'No Title'}</p>

      <p className="text-lg text-gray-900">${product.price}</p>
    </div>
  );
}
