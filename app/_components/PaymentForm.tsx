'use client';
import {
  useElements,
  useStripe,
  PaymentElement,
  AddressElement,
} from '@stripe/react-stripe-js';
import { useState, useContext } from 'react';
import ButtonComponent from './ButtonComponent';
import { SanityDocument } from 'next-sanity';
import CheckoutList from './CheckoutList';
import { updateProductsAfterPayment } from '../_lib/updateProductsAfterPayment';
import { globalStatesContext } from './GlobalStatesContext';
import { baseUrl } from '../utils/baseUrl';
import {
  PaymentIntent,
  StripeAddressElementChangeEvent,
  StripeError,
} from '@stripe/stripe-js';
import { notify } from './ReactToastifyProvider';
import { rollbackData } from '../_lib/rollbackData';
import { createOrder } from '../_lib/createOrder';
import { clearRollbackData } from '../_lib/clearRollbackData';
import { checkProductQuantity } from '../_lib/checkProductQuantity';
import { handleStripeError } from '../_lib/handleStripeError';
import { triggerProductQuantityEvent } from '../_lib/triggerNewProductQuantityEvent';

interface Props {
  productsWithImgUrlAndQuantity: (ProductWithImgUrl &
    SanityDocument & { productQuantity: number })[];
  subtotal: number;
  productsInCartWithSanityProductId: (ProductInShoppingCart & {
    sanityProductId: string;
  })[];
}

export default function PaymentForm({
  productsWithImgUrlAndQuantity,
  subtotal,
  productsInCartWithSanityProductId,
}: Props) {
  const { setChangeProductsInCart, productsInCart } =
    useContext(globalStatesContext);
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fullname, setFullname] = useState<string>('');
  const [address, setAddress] = useState<Address>({
    city: '',
    country: '',
    state: '',
    line1: '',
    line2: null,
    postal_code: '',
  });
  const [rollbackDataKey, setRollbackDataKey] = useState<string>('');

  const handleUpdateFullname = function (e: StripeAddressElementChangeEvent) {
    setFullname(e.value.name);
  };

  const handleUpdateAddress = function (e: StripeAddressElementChangeEvent) {
    setAddress(e.value.address);
  };

  const triggerProductEvents = async function (): Promise<void> {
    await Promise.all(
      productsWithImgUrlAndQuantity.map(
        async (
          product: ProductWithImgUrl &
            SanityDocument & { productQuantity: number }
        ) => {
          await triggerProductQuantityEvent(product.slug.current);
        }
      )
    );
  };

  const checkPaymentStatus = async function (paymentIntent: PaymentIntent) {
    switch (paymentIntent.status) {
      case 'succeeded':
        //create new order document
        await createOrder(fullname, 'prepare', address);
        //trigger events to update product quantity in realtime
        await triggerProductEvents();
        //clear rollback data in Redis database
        await clearRollbackData(rollbackDataKey);
        notify('success', 'Payment succeeded!', 'success-payment');

        //navigate user to order summary page
        // router.push('/');
        break;
      case 'processing':
        notify('info', 'Your payment is processing.', 'payment-in-process');
        break;
      case 'requires_payment_method':
        notify(
          'error',
          'Your payment was not successful, please try again.',
          'payment-error'
        );
        await rollbackData(rollbackDataKey);
        break;
      default:
        notify('error', 'Something went wrong.', 'error');
        await rollbackData(rollbackDataKey);
        break;
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      //check if there is any sold out product
      const result = await checkProductQuantity(productsInCart);

      if (!result.isSuccess) {
        console.log('Error when checking product quantity');
        return;
      }

      //if there are products that are sold out or are insufficient, revalidate product data for SSG pages and set changeProductsInCart to true to re-fetch product data for client components
      if (!result.noProductsSoldOut || !result.sufficientProducts) {
        notify(
          'info',
          'some products are sold out or not sufficient to purchase',
          'product-sold-out-or-not-sufficient'
        );
        return;
      }

      //update product data first before executing payment
      const returnedData = await updateProductsAfterPayment(
        productsInCartWithSanityProductId
      );

      //check if product data update process is failed or succeeded
      if (!returnedData.result) {
        console.log('Error when updating products during payment execution');
        return;
      }

      //if not failed, set rollbackDataKey state
      setRollbackDataKey(returnedData.rollbackDataKey as string);

      //roll back product data if stripe or elements instances are not available
      if (!stripe || !elements) {
        console.log('stripe or elements instances not available');
        await rollbackData(rollbackDataKey);
        return;
      }

      //execute payment
      const {
        error,
        paymentIntent,
      }: {
        error?: StripeError;
        paymentIntent?: PaymentIntent;
      } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${baseUrl}`,
        },
        //this ensures that redirection is implemented on demand
        redirect: 'if_required',
      });

      //check payment error
      if (error) {
        handleStripeError(error);
        await rollbackData(rollbackDataKey);
        return;
      }

      if (!paymentIntent) {
        console.error('payment intent not available');
        notify('error', 'Something went wrong.', 'payment-intent-error');
        await rollbackData(rollbackDataKey);
        return;
      }

      //check payment status after payment execution
      await checkPaymentStatus(paymentIntent);
    } catch (error: any) {
      console.log(
        'Error in submitHandler function in PaymentForm component' +
          error.message
      );
    } finally {
      setIsLoading(false);
      setRollbackDataKey('');
    }
  };

  return (
    <form id="payment-form" onSubmit={submitHandler}>
      <PaymentElement id="payment-element" />

      <AddressElement
        options={{ mode: 'shipping' }}
        onChange={(e: StripeAddressElementChangeEvent) => {
          handleUpdateAddress(e);
          handleUpdateFullname(e);
        }}
      />

      <CheckoutList
        productsWithImgUrlAndQuantity={productsWithImgUrlAndQuantity}
        checkoutListClassname="border-t mt-8 lg:mt-12 bg-white rounded-md p-6"
        subtotal={subtotal}
        tax={Math.round((subtotal * 12) / 100)}
        shipping={Math.round((subtotal * 2) / 100)}
      />

      <ButtonComponent
        isDisabled={isLoading || !stripe || !elements}
        animate
        buttonName="Pay now"
      />
    </form>
  );
}
