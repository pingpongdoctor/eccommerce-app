'use client';
import React, { useEffect, useState, useContext } from 'react';
import ListComponent from './ListComponent';
import { generateProductInstockList } from '../_lib/generateProductInstockList';
import { SanityDocument } from 'next-sanity';
import { updateProductQuantityForProductsInCart } from '../_lib/updateProductQuantityForProductsInCart';
import { globalStatesContext } from './GlobalStatesContext';

interface Props {
  product: ProductWithImgUrl & SanityDocument & { productQuantity: number };
}

export default function ChangeItemQuatityComponent({ product }: Props) {
  const [currentQuantity, setCurrentQuantity] = useState<number>(
    product.productQuantity
  );
  const { setIsNewProductAddedToCart } = useContext(globalStatesContext);

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
      setIsNewProductAddedToCart(true);
    }
  };

  return (
    <div>
      <ListComponent
        selectedValue={currentQuantity}
        listData={generateProductInstockList(product.instock)}
        listComponentChangeEventHandler={handleUpdateQuantityState}
        listComponentClickEventHandler={handleSubmitNewProductQuantity}
      />
    </div>
  );
}
