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
import { StripeError } from '@stripe/stripe-js';

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
  const { setChangeProductsInCart } = useContext(globalStatesContext);
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>('');
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
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await updateProductsAfterPayment(productsInCartWithSanityProductId);
    setChangeProductsInCart(true);

    try {
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      setIsLoading(true);

      const { error }: { error: StripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${baseUrl}`,
        },
      });

      if (error.type === 'card_error' || error.type === 'validation_error') {
        if (!error.message) {
          setMessage('An unexpected error occurred.');
        } else {
          setMessage(error.message);
        }
      } else {
        setMessage('An unexpected error occurred.');
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="payment-form" onSubmit={submitHandler}>
      <PaymentElement id="payment-element" />

      <AddressElement options={{ mode: 'shipping' }} />

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
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
