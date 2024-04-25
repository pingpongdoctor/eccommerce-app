'use client';
import { useState, useContext, useEffect } from 'react';
import ListComponent from './ListComponent';
import { generateProductInstockList } from '../_lib/generateProductInstockList';
import { SanityDocument } from 'next-sanity';
import { updateProductQuantityForProductsInCart } from '../_lib/updateProductQuantityForProductsInCart';
import { globalStatesContext } from './GlobalStatesContext';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { deleteProductFromCart } from '../_lib/deleteProductFromCart';
import { notify } from './ReactToastifyProvider';
import Pusher from 'pusher-js';

interface Props {
  product: ProductWithImgUrl & SanityDocument & { productQuantity: number };
  showIcon?: boolean;
}

export default function ChangeItemQuantityComponent({
  product,
  showIcon = true,
}: Props) {
  const [currentQuantity, setCurrentQuantity] = useState<number>(
    product.productQuantity
  );
  const [productInstock, setProductInstock] = useState<number>(product.instock);
  const { setChangeProductsInCart } = useContext(globalStatesContext);

  //bind a function to new-product-quantity channel to listen to the new-product-quantity event
  //when there are new product stocked quantity, set productInstock state with new value to update the UI
  //also nofity user if this product is sold out
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
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
        }
      }
    );
    return () => {
      pusher.unsubscribe('new-product-quantity');
      channel.unbind_all();
      pusher.disconnect();
    };
  }, [product.slug.current]);

  const handleUpdateQuantityState = async function (value: number) {
    if (value !== currentQuantity) {
      setCurrentQuantity(value);
    }
  };

  const handleSubmitNewProductQuantity = async function (quantity: number) {
    const isSuccess = await updateProductQuantityForProductsInCart(
      quantity,
      product.slug.current
    );
    if (isSuccess) {
      setChangeProductsInCart(true);
    }
  };

  const handleDeleteProductFromCart = async function (): Promise<void> {
    const isSuccess = await deleteProductFromCart(product.slug.current);

    if (isSuccess) {
      notify(
        'success',
        'Product is deleted from your cart',
        'success-delete-product-from-cart'
      );
      setChangeProductsInCart(true);
    }
  };

  return (
    <>
      {productInstock === 0 ? (
        <p className="text-red-500">Product is sold out</p>
      ) : (
        <ListComponent
          selectedValue={currentQuantity}
          listData={generateProductInstockList(product.instock)}
          listComponentChangeEventHandler={handleUpdateQuantityState}
          listComponentClickEventHandler={handleSubmitNewProductQuantity}
          listClassname="max-h-[200px]"
          listButtonClassname="w-[100px]"
        />
      )}
      {showIcon && (
        <XMarkIcon
          className="hidden h-6 text-gray-400 sm:block"
          onClick={handleDeleteProductFromCart}
        />
      )}
    </>
  );
}
