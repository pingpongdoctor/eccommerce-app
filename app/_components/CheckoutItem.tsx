'use client';
import { SanityDocument } from 'next-sanity';
import Image from 'next/image';
import { solidBlurDataUrl } from '../utils/utils';
import { XMarkIcon } from '@heroicons/react/20/solid';
import ChangeItemQuantityComponent from './ChangeItemQuantityComponent';
import { deleteProductFromCart } from '../_lib/deleteProductFromCart';
import { useContext, useEffect, useState } from 'react';
import { globalStatesContext } from './GlobalStatesContext';
import { useRouter } from 'next/navigation';
import { notify } from './ReactToastifyProvider';
import pusherJs from 'pusher-js';

interface Props {
  product: ProductWithImgUrl & SanityDocument & { productQuantity: number };
}
export default function CheckoutItem({ product }: Props) {
  const router = useRouter();
  const { setChangeProductsInCart } = useContext(globalStatesContext);
  const [productInstock, setProductInstock] = useState<number>(product.instock);
  const handleDeleteProductFromCart = async function (): Promise<void> {
    const isSuccess = await deleteProductFromCart(product.slug.current);

    if (isSuccess) {
      setChangeProductsInCart(true);
      notify(
        'success',
        'Product is deleted from your cart',
        'success-delete-product-from-cart'
      );
      // router.refresh();
    }
  };

  //bind a function to new-product-quantity channel to listen to the new-product-quantity event
  //when there are new product stocked quantity, set productInstock state with new value to update the UI
  //also nofity user if this product is sold out
  useEffect(() => {
    const pusher = new pusherJs(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    });

    const channel = pusher.subscribe('new-product-quantity');

    channel.bind(
      `new-product-quantity-${product.slug.current}-event`,
      function (data: { newProductQuantity: number }) {
        setProductInstock(data.newProductQuantity);
        if (data.newProductQuantity === 0) {
          notify(
            'info',
            `${product.title} has been sold out`,
            'sold-out-notification'
          );
          router.back();
        }
      }
    );
    return () => {
      pusher.unsubscribe('new-product-quantity');
      channel.unbind_all();
      pusher.disconnect();
    };
  }, [product.slug.current]);

  return (
    <div className="flex gap-6 border-b pb-8 last:mb-0">
      <Image
        src={product.imgUrl}
        placeholder="blur"
        blurDataURL={solidBlurDataUrl}
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
          {productInstock === 0 ? (
            <p className="text-red-500">Product is sold out</p>
          ) : (
            <ChangeItemQuantityComponent showIcon={false} product={product} />
          )}
        </div>
      </div>
    </div>
  );
}
