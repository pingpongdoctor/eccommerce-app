'use client';
import { FormEvent, useContext, useEffect, useState } from 'react';
import ButtonComponent from './ButtonComponent';
import ListComponent from './ListComponent';
import { addProductToCart } from '../_lib/addProductToCart';
import { notify } from './ReactToastifyProvider';
import { generateProductInstockList } from '../_lib/generateProductInstockList';
import { globalStatesContext } from './GlobalStatesContext';
import Pusher from 'pusher-js';
import { getProduct } from '../_lib/getProduct';
import { Product } from '@prisma/client';

interface Props {
  productSlug: string;
}

export default function AddToBagComponent({ productSlug }: Props) {
  const { userProfile, setChangeProductsInCart } =
    useContext(globalStatesContext);
  const [quantity, setQuantity] = useState<number>(1);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [productInstock, setProductInstock] = useState<number | null>(null);

  //bind a function to new-product-quantity channel to listen to the new-product-quantity event
  //when there are new product stocked quantity, set productInstock state with new value to update the UI
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    });

    const channel = pusher.subscribe('new-product-quantity');

    channel.bind(
      `new-product-quantity-${productSlug}-event`,
      function (data: { newProductQuantity: number }) {
        setProductInstock(data.newProductQuantity);
      }
    );

    return () => {
      pusher.unsubscribe('new-product-quantity');
      channel.unbind_all();
      pusher.disconnect();
    };
  }, [productSlug]);

  //get product quantity when this client component is initially loaded
  useEffect(() => {
    getProduct(productSlug)
      .then((productData: Product | undefined) => {
        if (!productData) {
          setProductInstock(0);
          return;
        }

        setProductInstock(productData.instock);
      })
      .catch((e: any) => {
        console.log(e);
        setProductInstock(0);
      });
  }, [productSlug]);

  const handleUpdateQuantity = function (value: number) {
    setQuantity(value);
  };

  const handleSubmitNewProductToCart = async function (
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    if (!userProfile) {
      notify('info', 'Please log in to start shopping', 'login-info');
      return;
    }

    if (!productSlug) {
      console.log('Missed required productSlug value');
      return;
    }

    try {
      setIsDisable(true);

      await addProductToCart(productSlug, quantity);
    } catch (e: any) {
      console.log('Error submiting products for the current user' + ' ' + e);
    } finally {
      setIsDisable(false);
      setChangeProductsInCart(true);
    }
  };

  //when productInstock has not been loaded, we disable the list and the button
  if (productInstock === null) {
    return (
      <form
        onSubmit={handleSubmitNewProductToCart}
        className="flex flex-col gap-12 lg:gap-52"
      >
        <ListComponent
          selectedValue={quantity}
          listComponentChangeEventHandler={handleUpdateQuantity}
          listData={generateProductInstockList(1)}
          listButtonDisabled={true}
          listClassname="max-h-[180px]"
        />
        <ButtonComponent isDisabled={true} buttonName="Add to bag" animate />
      </form>
    );
  } else if (productInstock === 0) {
    return <p className="text-red-500">Product is sold out</p>;
  } else {
    return (
      <form
        onSubmit={handleSubmitNewProductToCart}
        className="flex flex-col gap-12 lg:gap-52"
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
