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
import { rollbackData } from '../_lib/rollbackData';
import { createOrder } from '../_lib/createOrder';
import { clearRollbackData } from '../_lib/clearRollbackData';
import { checkProductQuantity } from '../_lib/checkProductQuantity';
import { handleStripeError } from '../_lib/handleStripeError';
import { triggerProductQuantityEvent } from '../_lib/triggerNewProductQuantityEvent';
import { useRouter } from 'next/navigation';
import { sendEmailPaymentConfirm } from '../_lib/sendEmailPaymentConfirm';
import { formatDateToWords } from '../_lib/formatDateToWords';
import { deleteProductsInCartAfterPayment } from '../_lib/deleteProductsInCartAfterPayment';

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
  const { setChangeProductsInCart, productsInCart, userProfile } =
    useContext(globalStatesContext);
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [tax, setTax] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
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

  const handleUpdateFullname = function (e: StripeAddressElementChangeEvent) {
    setFullname(e.value.name);
  };

  const handleUpdateAddress = function (e: StripeAddressElementChangeEvent) {
    setAddress(e.value.address);
  };

  const updateProductQuantityInRealtime = async function (): Promise<void> {
    try {
      await Promise.all(
        productsWithImgUrlAndQuantity.map(
          async (
            product: ProductWithImgUrl &
              SanityDocument & { productQuantity: number }
          ) => {
            //trigger product quantity event to let product data updated in realtime using realtime communication that is managed by Pusher service
            await triggerProductQuantityEvent(product.slug.current);
          }
        )
      );
    } catch (e: any) {
      console.log('Error when udapting product quantity' + e);
    }
  };

  //set tax, shipping and subtotal
  useEffect(() => {
    const tax = Math.round((subtotal * 10) / 100);
    setTax(tax);
    //assume that tax is equal to shipping fee
    setShipping(tax);
    setTotal(tax * 2 + subtotal);
  }, [subtotal]);

  const checkPaymentStatus = async function (
    paymentIntent: PaymentIntent,
    rollbackDataKey: string
  ) {
    console.log('running check payment status');
    try {
      switch (paymentIntent.status) {
        case 'succeeded':
          //delete products in cart
          const productIds: number[] = productsInCartWithSanityProductId.map(
            (
              productInShoppingCart: ProductInShoppingCart & {
                sanityProductId: string;
              }
            ) => productInShoppingCart.productId
          );
          await deleteProductsInCartAfterPayment(productIds);
          //create new order
          const data: {
            isSuccess: boolean;
            transactionNumber?: string | undefined;
            expectedDeliveryDate?: string | undefined;
          } = await createOrder(
            fullname,
            'prepare',
            address,
            purchasedProducts
          ); //create order and return expectedDeliveryTime and transactionNumber
          //trigger events to update product quantity in realtime
          await updateProductQuantityInRealtime();
          //clear rollback data in Redis database
          await clearRollbackData(rollbackDataKey);

          //check if order is successfully created on database
          if (!data.isSuccess) {
            notify(
              'error',
              'There is a problem taking place when creating your order. Please contact our team for support if your payment is executed',
              'error-creating-order'
            );
          } else {
            const expectedTimeToDelivery = formatDateToWords(
              data.expectedDeliveryDate as string
            );

            //send email payment confirmation
            await sendEmailPaymentConfirm(
              'thanhnhantran1501@gmail.com', //will change this later on
              userProfile.email as string,
              subtotal,
              tax,
              shipping,
              total,
              expectedTimeToDelivery,
              data.transactionNumber as string,
              productsWithImgUrlAndQuantity
            );

            notify(
              'success',
              'Thank you for your purchase at Glowy Lab!',
              'success-payment'
            );
          }

          // //navigate user to order summary page
          // router.push('/');
          break;
        default:
          notify('error', 'Something went wrong.', 'payment-error');
          await rollbackData(rollbackDataKey);
          break;
      }
    } catch (e: any) {
      console.log('Error when checking payment status' + e);
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      //check if there is any sold out product
      const { isSuccess, noProductsSoldOut, sufficientProducts } =
        await checkProductQuantity(productsInCart);
      if (!isSuccess) {
        console.log('Error when checking product quantity');
        return;
      }
      //if there are products that are sold out or are insufficient, revalidate product data for SSG pages and set changeProductsInCart to true to re-fetch product data for client components
      if (!noProductsSoldOut || !sufficientProducts) {
        notify(
          'info',
          'some products are sold out or not sufficient to purchase',
          'product-sold-out-or-not-sufficient'
        );
        return;
      }
      //update product data first before executing payment
      const { result, rollbackDataKey } = await updateProductsAfterPayment(
        productsInCartWithSanityProductId
      );

      //check if product data update process is failed or succeeded
      if (!result) {
        console.log('Error when updating products during payment execution');
        return;
      }

      //roll back product data if stripe or elements instances are not available
      if (!stripe || !elements) {
        console.log('stripe or elements instances not available');
        await rollbackData(rollbackDataKey as string);
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
        await rollbackData(rollbackDataKey as string);
        return;
      }
      if (!paymentIntent) {
        console.error('payment intent not available');
        await rollbackData(rollbackDataKey as string);
        return;
      }
      //check payment status after payment execution
      await checkPaymentStatus(paymentIntent, rollbackDataKey as string);
    } catch (error: any) {
      console.log(
        'Error in submitHandler function in PaymentForm component' + error
      );
    } finally {
      setIsLoading(false);
      setChangeProductsInCart(true);
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
        tax={tax}
        shipping={shipping}
      />

      <ButtonComponent
        isDisabled={isLoading || !stripe || !elements}
        animate
        buttonName="Pay now"
      />
    </form>
  );
}
