import React from 'react';
import {
  useElements,
  useStripe,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { baseUrl } from '../utils/baseUrl';
import { useState, useEffect } from 'react';
import { StripeError } from '@stripe/stripe-js';
import ButtonComponent from './ButtonComponent';
import { SanityDocument } from 'next-sanity';
import CheckoutList from './CheckoutList';

interface Props {
  productsWithImgUrlAndQuantity: (ProductWithImgUrl &
    SanityDocument & { productQuantity: number })[];
  subtotal: number;
}

export default function PaymentForm({
  productsWithImgUrlAndQuantity,
  subtotal,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
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
