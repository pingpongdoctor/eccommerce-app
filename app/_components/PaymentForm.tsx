'use client';
import {
  useElements,
  useStripe,
  PaymentElement,
  AddressElement,
} from '@stripe/react-stripe-js';
import { useState, useEffect, useContext } from 'react';
import ButtonComponent from './ButtonComponent';
import { SanityDocument } from 'next-sanity';
import CheckoutList from './CheckoutList';
import { updateProductsAfterPayment } from '../_lib/updateProductsAfterPayment';
import { globalStatesContext } from './GlobalStatesContext';
import { baseUrl } from '../utils/baseUrl';
import { PaymentIntent, StripeError } from '@stripe/stripe-js';
import { notify } from './ReactToastifyProvider';
import { useRouter } from 'next/navigation';

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
  const { setChangeProductsInCart, user } = useContext(globalStatesContext);
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!stripe) {
      console.error('stripe instant not available');
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      console.error('stripe client secret not available');
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        console.error('payment intent not available');
        return;
      }

      switch (paymentIntent.status) {
        case 'succeeded':
          notify('success', 'Payment succeeded!', 'success-payment');
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
          break;
        default:
          notify('error', 'Something went wrong.', 'error');
          break;
      }
    });
  }, [stripe]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      setIsLoading(true);

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
          receipt_email: 'thanhnhantran1501@gmail.com',
        },
        redirect: 'if_required',
      });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          notify('error', error.message || '', 'card-validation-errors');
        } else {
          notify('error', 'Something went wrong.', 'error');
        }
        return;
      }

      if (!paymentIntent) {
        console.error('payment intent not available');
        return;
      }

      console.log(paymentIntent.status);

      switch (paymentIntent.status) {
        case 'succeeded':
          await updateProductsAfterPayment(productsInCartWithSanityProductId);
          setChangeProductsInCart(true);
          notify('success', 'Payment succeeded!', 'success-payment');
          router.push('/');
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
          break;
        default:
          notify('error', 'Something went wrong.', 'error');
          break;
      }
    } catch (error) {
      console.log(error);
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
          console.log(e.value.address);
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
