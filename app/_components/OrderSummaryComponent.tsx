'use client';
import ButtonComponent from './ButtonComponent';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { globalStatesContext } from './GlobalStatesContext';
import { checkProductQuantity } from '../_lib/checkProductQuantity';
import { notify } from './ReactToastifyProvider';

interface Props {
  subtotal: number;
  shipping: number;
  tax: number;
  orderSummaryComponentClassname?: string;
  showButton?: boolean;
}

export default function OrderSummaryComponent({
  orderSummaryComponentClassname,
  subtotal,
  shipping,
  tax,
  showButton = true,
}: Props) {
  const router = useRouter();
  const { productsInCart, setChangeProductsInCart } =
    useContext(globalStatesContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const summaryData = [
    {
      text: 'Subtotal',
      ammount: subtotal,
    },
    {
      text: 'Shipping estimate',
      ammount: shipping,
    },
    {
      text: 'Tax estimate',
      ammount: tax,
    },
    {
      text: 'Order total',
      ammount: subtotal + shipping + tax,
    },
  ];

  const handleCheckout = async function () {
    try {
      setIsLoading(true);
      const result = await checkProductQuantity(productsInCart);
      if (!result.isSuccess) {
        console.log('Error when checking product quantity');
        return;
      }

      //if there are products that are sold out or are insufficient, set changeProductsInCart to true to re-fetch product data
      if (!result.noProductsSoldOut) {
        notify(
          'info',
          'Some products in your cart are sold out',
          'product-sold-out'
        );

        notify(
          'info',
          'Please delete sold out products from your cart',
          'delete-product'
        );
        return;
      }

      if (!result.sufficientProducts) {
        notify(
          'info',
          'Quantity of some products exceeds available stock and is adjusted to match the available quantity limit',
          'not-sufficient-product'
        );
        setChangeProductsInCart(true);
        return;
      }

      //if checking process succeeds
      router.push('/checkout');
    } catch (e: any) {
      console.log('Error in handleCheckout function' + e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${orderSummaryComponentClassname}`}>
      <div className="rounded-md bg-gray-100/85 p-4">
        <p className="text-lg font-medium">Order summary</p>
        {summaryData.map((ele) => (
          <div
            key={ele.text}
            className={`flex justify-between border-b py-4 text-sm ${
              ele.text === 'Order total' && 'border-b-0'
            }`}
          >
            <p
              className={`${
                ele.text === 'Order total'
                  ? 'text-lg font-medium'
                  : 'text-gray-500'
              }`}
            >
              {ele.text}
            </p>
            <p className="font-medium">${ele.ammount}</p>
          </div>
        ))}

        {showButton && (
          <ButtonComponent
            buttonOnclickHandler={async (e) => {
              await handleCheckout();
            }}
            buttonName="Check out"
            animate={true}
            isDisabled={isLoading}
          />
        )}
      </div>
    </div>
  );
}
