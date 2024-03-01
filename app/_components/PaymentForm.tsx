'use client';
import {
  useElements,
  useStripe,
  PaymentElement,
  AddressElement,
} from '@stripe/react-stripe-js';
import { useState, useContext, useEffect } from 'react';
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
import { useRouter } from 'next/navigation';
import { rollbackData } from '../_lib/rollbackData';
import { createOrder } from '../_lib/createOrder';

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
  const router = useRouter();
  const { setChangeProductsInCart } = useContext(globalStatesContext);
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [fullname, setFullname] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string | null>(null);
  const [address, setAddress] = useState<Address>({
    city: '',
    country: '',
    state: '',
    line1: '',
    line2: null,
    postal_code: '',
  });

  const handleUpdateFullname = function (e: StripeAddressElementChangeEvent) {
    setFullname(e.value.name);
  };

  const handleUpdatePhonenumber = function (
    e: StripeAddressElementChangeEvent
  ) {
    setPhonenumber(e.value.phone ? e.value.phone : null);
  };

  const handleUpdateAddress = function (e: StripeAddressElementChangeEvent) {
    setAddress(e.value.address);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const isSuccess = await updateProductsAfterPayment(
        productsInCartWithSanityProductId
      );

      if (!isSuccess) {
        console.log('Error when updating products during payment execution');
        return;
      }

      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

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
        redirect: 'if_required',
      });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          notify(
            'error',
            error.message || 'Something went wrong.',
            'card-validation-errors'
          );
        } else {
          notify('error', 'Something went wrong.', 'error');
        }
        await rollbackData();
        return;
      }

      if (!paymentIntent) {
        console.error('payment intent not available');
        notify('error', 'Something went wrong.', 'payment-intent-error');
        await rollbackData();
        return;
      }

      switch (paymentIntent.status) {
        case 'succeeded':
          setChangeProductsInCart(true);
          notify('success', 'Payment succeeded!', 'success-payment');
          //do not worry if fields below are empty string when creating order records since there are always errors shown up if some of these fields are not filled correctly
          //this is ensured by handling the error object above
          await createOrder(fullname, phonenumber, 'prepare', address);
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
          await rollbackData();
          break;
        default:
          notify('error', 'Something went wrong.', 'error');
          await rollbackData();
          break;
      }
    } catch (error: any) {
      console.log(error.message);
      await rollbackData();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={submitHandler}>
      <PaymentElement id="payment-element" />

      <AddressElement
        options={{ mode: 'shipping' }}
        onChange={(e) => {
          handleUpdateAddress(e);
          handleUpdateFullname(e);
          handleUpdatePhonenumber(e);
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
