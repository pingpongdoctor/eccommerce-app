'use client';
import React, { useEffect, useState, useContext } from 'react';
import ListComponent from './ListComponent';
import { generateProductInstockList } from '../_lib/generateProductInstockList';
import { SanityDocument } from 'next-sanity';
import { updateProductQuantityForProductsInCart } from '../_lib/updateProductQuantityForProductsInCart';
import { globalStatesContext } from './GlobalStatesContext';

interface Props {
  product: ProductWithImgUrl & SanityDocument;
}

export default function ChangeItemQuatityComponent({ product }: Props) {
  const [currentQuantity, setCurrentQuantity] = useState<number>(
    product.instock
  );

  const { setIsNewProductAddedToCart } = useContext(globalStatesContext);

  const handleUpdateQuantityState = async function (value: number) {
    if (value !== currentQuantity) {
      setCurrentQuantity(value);
    }
  };

  useEffect(() => {
    updateProductQuantityForProductsInCart(
      currentQuantity,
      product.slug.current
    )
      .then((isSuccess: boolean) => {
        if (isSuccess) {
          setIsNewProductAddedToCart(true);
        }
      })
      .catch((e: any) => {
        console.log(e.message);
      });
  }, [currentQuantity]);

  return (
    <div>
      <ListComponent
        selectedValue={currentQuantity}
        listData={generateProductInstockList(product.instock)}
        listComponentChangeEventHandler={handleUpdateQuantityState}
      />
    </div>
  );
}
