'use client';
import { SanityDocument } from 'next-sanity';
import Image from 'next/image';
import { solidBlureDataUrl } from '../utils/utils';
import { XMarkIcon } from '@heroicons/react/20/solid';
import ChangeItemQuatityComponent from './ChangeItemQuatityComponent';
import { deleteProductFromCart } from '../_lib/deleteProductFromCart';
import { useContext } from 'react';
import { globalStatesContext } from './GlobalStatesContext';
import { useRouter } from 'next/navigation';
import { notify } from './ReactToastifyProvider';

interface Props {
  product: ProductWithImgUrl & SanityDocument & { productQuantity: number };
}
export default function CheckoutItem({ product }: Props) {
  const router = useRouter();
  const { setChangeProductsInCart } = useContext(globalStatesContext);
  const handleDeleteProductFromCart = async function (): Promise<void> {
    const isSuccess = await deleteProductFromCart(product.slug.current);

    if (isSuccess) {
      setChangeProductsInCart(true);
      notify(
        'success',
        'Product is deleted from your cart',
        'success-delete-product-from-cart'
      );
      router.refresh();
    }
  };

  return (
    <div className="flex gap-6 border-b pb-8 last:mb-0">
      <Image
        src={product.imgUrl}
        placeholder="blur"
        blurDataURL={solidBlureDataUrl}
        priority
        alt="product-img-shopping-cart"
        width={300}
        height={300}
        className="object-fit aspect-[1/1.2] w-24 rounded-md object-cover object-center transition-all hover:opacity-90"
      />

      <div className="flex grow flex-col justify-between">
        <div className="flex items-center justify-between">
          <p className="text-nowrap">{product.title}</p>
          <XMarkIcon
            className="h-6 text-gray-400"
            onClick={handleDeleteProductFromCart}
          />
        </div>
        <div className="flex items-center justify-between">
          <p>${product.price}</p>
          {product.instock === 0 ? (
            <p className="text-red-500">Product is sold out</p>
          ) : (
            <ChangeItemQuatityComponent showIcon={false} product={product} />
          )}
        </div>
      </div>
    </div>
  );
}
