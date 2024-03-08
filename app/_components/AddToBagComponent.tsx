'use client';
import { FormEvent, useContext } from 'react';
import ButtonComponent from './ButtonComponent';
import ListComponent from './ListComponent';
import { useState } from 'react';
import { addProductToCart } from '../_lib/addProductToCart';
import { notify } from './ReactToastifyProvider';
import { generateProductInstockList } from '../_lib/generateProductInstockList';
import { globalStatesContext } from './GlobalStatesContext';
import { useRouter } from 'next/navigation';

interface Props {
  productSlug: string;
  productInstock: number;
}

export default function AddToBagComponent({
  productSlug,
  productInstock,
}: Props) {
  const router = useRouter();
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

      const result = await addProductToCart(productSlug, quantity);

      //set this state to true to update data in the nav bar
      if (result.isSuccess) {
        setChangeProductsInCart(true);
        return;
      }

      //if adding product to cart action fails since product is sold out, this SSG page will be revalidated with new data
      //refresh the page to update the UI
      if (result.isProductSoldOut) {
        setChangeProductsInCart(true);
        router.refresh();
      }
    } catch (e: any) {
      console.log(
        'Error submiting products for the current user' + ' ' + e.message
      );
    } finally {
      setIsDisable(false);
    }
  };

  if (productInstock === 0) {
    return <p className="text-red-500">Product is sold out</p>;
  } else {
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
        <ButtonComponent
          isDisabled={isDisable}
          buttonName="Add to bag"
          animate
        />
      </form>
    );
  }
}
