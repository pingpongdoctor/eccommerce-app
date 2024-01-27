'use client';
import React, { FormEvent } from 'react';
import ButtonComponent from './ButtonComponent';
import ListComponent from './ListComponent';
import { useState } from 'react';
import { addProductToCart } from '../_lib/addProductToCart';
import { notify } from './ReactToastifyProvider';

interface Props {
  productSlug: string;
}

export default function AddToBagComponent({ productSlug }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const handleUpdateQuantity = function (value: number) {
    setQuantity(value);
  };

  const handleSubmitProductForUser = async function (
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!productSlug) {
      console.log('Missed required values');
    }

    try {
      await addProductToCart(productSlug, quantity);
    } catch (e: any) {
      console.log(
        'Error submiting products for the current user' + ' ' + e.message
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmitProductForUser}
      className="flex flex-col gap-52"
    >
      <ListComponent
        selectedValue={quantity}
        listComponentHandler={handleUpdateQuantity}
      />
      <ButtonComponent buttonName="Add to bag" animate />
    </form>
  );
}
