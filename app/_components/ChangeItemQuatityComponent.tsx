'use client';
import { useState, useContext } from 'react';
import ListComponent from './ListComponent';
import { generateProductInstockList } from '../_lib/generateProductInstockList';
import { SanityDocument } from 'next-sanity';
import { updateProductQuantityForProductsInCart } from '../_lib/updateProductQuantityForProductsInCart';
import { globalStatesContext } from './GlobalStatesContext';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { deleteProductFromCart } from '../_lib/deleteProductFromCart';
import { notify } from './ReactToastifyProvider';
import { useRouter } from 'next/navigation';

interface Props {
  product: ProductWithImgUrl & SanityDocument & { productQuantity: number };
  showIcon?: boolean;
}

export default function ChangeItemQuatityComponent({
  product,
  showIcon = true,
}: Props) {
  const [currentQuantity, setCurrentQuantity] = useState<number>(
    product.productQuantity
  );
  const { setChangeProductsInCart } = useContext(globalStatesContext);

  const router = useRouter();

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
    <>
      {product.instock === 0 ? (
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
