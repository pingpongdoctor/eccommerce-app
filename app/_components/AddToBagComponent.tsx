'use client';
import { FormEvent, useContext } from 'react';
import ButtonComponent from './ButtonComponent';
import ListComponent from './ListComponent';
import { useState } from 'react';
import { addProductToCart } from '../_lib/addProductToCart';
import { notify } from './ReactToastifyProvider';
import { generateProductInstockList } from '../_lib/generateProductInstockList';
import { globalStatesContext } from './GlobalStatesContext';

interface Props {
  productSlug: string;
  productInstock: number;
}

export default function AddToBagComponent({
  productSlug,
  productInstock,
}: Props) {
  const { userProfile } = useContext(globalStatesContext);
  const [quantity, setQuantity] = useState<number>(1);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const { setChangeProductsInCart } = useContext(globalStatesContext);

  const handleUpdateQuantity = function (value: number) {
    setQuantity(value);
  };

  const handleSubmitProductForUser = async function (
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    if (!userProfile) {
      notify('info', 'Please log in to write a review', 'login-info');
      return;
    }

    if (!productSlug) {
      console.log('Missed required values');
      return;
    }

    try {
      setIsDisable(true);

      const isSuccess = await addProductToCart(productSlug, quantity);

      if (isSuccess) {
        notify(
          'success',
          'Product has been added to your cart',
          'add-product-to-cart-success'
        );
        setChangeProductsInCart(true);
      }
    } catch (e: any) {
      console.log(
        'Error submiting products for the current user' + ' ' + e.message
      );
    } finally {
      setIsDisable(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmitProductForUser}
      className="flex flex-col gap-52"
    >
      <ListComponent
        selectedValue={quantity}
        listComponentChangeEventHandler={handleUpdateQuantity}
        listData={generateProductInstockList(productInstock)}
        listClassname="max-h-[180px]"
      />
      <ButtonComponent isDisabled={isDisable} buttonName="Add to bag" animate />
    </form>
  );
}
