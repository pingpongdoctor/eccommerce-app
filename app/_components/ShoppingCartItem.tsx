import Image from 'next/image';
import { solidBlureDataUrl } from '../utils/utils';
import { SanityDocument } from 'next-sanity';
import ChangeItemQuatityComponent from './ChangeItemQuatityComponent';

interface Props {
  product: ProductWithImgUrl & SanityDocument & { productQuantity: number };
}

export default function ShoppingCartItem({ product }: Props) {
  return (
    <div className="flex gap-6 font-medium">
      <Image
        src={product.imgUrl}
        placeholder="blur"
        blurDataURL={solidBlureDataUrl}
        priority
        alt="product-img-shopping-cart"
        width={300}
        height={300}
        className="object-fit aspect-[1/1.2] w-48 rounded-md object-cover object-center transition-all hover:opacity-90"
      />
      <div>
        <div className="flex gap-16">
          <p>{product.title}</p>
          <ChangeItemQuatityComponent product={product} />
        </div>
        <p>${product.price}</p>
      </div>
    </div>
  );
}
