'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../_components/PaymentForm';
import { useState, useEffect, useContext } from 'react';
import { SanityDocument } from 'next-sanity';
import { PRODUCTS_QUERY_BY_SLUGS } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { globalStatesContext } from '../_components/GlobalStatesContext';
import ShoppingCartItemSkeleton from '../_components/ShoppingCartItemSkeleton';
import OrderSummarySkeleton from '../_components/OrderSummarySkeleton';
import { addProductImgUrls } from '../_lib/addProductImgUrls';
import { addProductQuantity } from '../_lib/addProductQuantity';
import { calculateSubtotal } from '../_lib/calculateSubtotal';
import { useRouter } from 'next/navigation';
import { createStripePaymentIntent } from '../_lib/createStripePaymentIntent';
import { addSanityProductId } from '../_lib/addSanityProductId';
import ButtonSkeleton from '../_components/ButtonSkeleton';
import { notify } from '../_components/ReactToastifyProvider';
import GoBackBtn from '../_components/GoBackBtn';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string>('');
  const { productsInCart, user } = useContext(globalStatesContext);
  const [
    productsInCartWithSanityProductId,
    setProductsInCartWithSanityProductId,
  ] = useState<
    (ProductInShoppingCart & {
      sanityProductId: string;
    })[]
  >([]);
  const [sanityProductsInCart, setSanityProductsInCart] = useState<
    (SanityProduct & SanityDocument)[]
  >([]);
  const [productsWithImgUrlAndQuantity, setProductsWithImgUrlAndQuantity] =
    useState<
      (ProductWithImgUrl & SanityDocument & { productQuantity: number })[]
    >([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [isFetchingSanityProducts, setIsFetchingSanityProducts] =
    useState<boolean>(false);

  const handleClearAllStates = function () {
    setSanityProductsInCart([]);
    setProductsWithImgUrlAndQuantity([]);
    setProductsInCartWithSanityProductId([]);
    setClientSecret('');
    setSubtotal(0);
  };

  //get product sanity documents
  useEffect(() => {
    try {
      if (productsInCart.length > 0) {
        // only show skeleton component when page is initially rendered
        if (sanityProductsInCart.length === 0) {
          setIsFetchingSanityProducts(true);
        }

        const productSlugs: string[] = productsInCart
          ? productsInCart.map(
              (product: ProductInShoppingCart) => product.productSlug
            )
          : [];

        client
          .fetch<(SanityProduct & SanityDocument)[]>(PRODUCTS_QUERY_BY_SLUGS, {
            slugArr: productSlugs,
          })
          .then((products: (SanityProduct & SanityDocument)[]) => {
            setSanityProductsInCart(products);
          })
          .catch((e: any) => {
            console.log(e);
          });
      } else {
        handleClearAllStates();
      }
    } catch (e: any) {
      console.log('Error when setting sanityProductsIncCart state' + e);
      handleClearAllStates();
    } finally {
      //set this state to false if its value is true
      setIsFetchingSanityProducts(false);
    }
  }, [productsInCart]);

  useEffect(() => {
    try {
      if (productsInCart.length > 0 && sanityProductsInCart.length > 0) {
        // set the state of products with image url and quantity
        const productsWithImgUrl: (ProductWithImgUrl & SanityDocument)[] =
          addProductImgUrls(sanityProductsInCart);
        const productsWithImgAndQuantity = addProductQuantity(
          productsWithImgUrl,
          productsInCart
        );
        setProductsWithImgUrlAndQuantity(productsWithImgAndQuantity);

        //set subtotal state
        setSubtotal(calculateSubtotal(productsInCart, sanityProductsInCart));

        // set the state of products in cart with sanity product id
        const productsInCartWithSanityId: (ProductInShoppingCart & {
          sanityProductId: string;
        })[] = addSanityProductId(productsInCart, sanityProductsInCart);

        setProductsInCartWithSanityProductId(productsInCartWithSanityId);
      }
    } catch (e: any) {
      console.log(
        'Error when setting the productsWithImgUrlAndQuantity, productsInCartWithSanityProductId and subtotal states' +
          e
      );
      handleClearAllStates();
    }
  }, [productsInCart, sanityProductsInCart]);

  // Create PaymentIntent as soon as the page loads
  useEffect(() => {
    if (user && subtotal !== 0) {
      createStripePaymentIntent(subtotal)
        .then((secretString: string | undefined) => {
          if (secretString) {
            setClientSecret(secretString);
          }
        })
        .catch((e: any) => {
          console.log('Error when creating stripe payment intent' + e);
        });
    }
  }, [user, subtotal]);

  //check if any product in cart is sold out when sanityProductInCart data is initially fetched
  useEffect(() => {
    if (sanityProductsInCart.length > 0) {
      sanityProductsInCart.map((product: SanityProduct & SanityDocument) => {
        if (product.instock === 0) {
          notify(
            'info',
            `${product.title} has been sold out`,
            'cart-include-sold-out-products'
          );
          router.push('/shopping-cart');
          return;
        }
      });
    }
  }, [sanityProductsInCart, router]);

  return (
    <main className="px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
      <GoBackBtn goBackBtnClassname="text-gray-700 mb-4" />
      <div className="rounded-md bg-gray-100/85 p-4 md:p-8 lg:p-12 xl:mx-auto xl:max-w-7xl">
        {isFetchingSanityProducts ? (
          <>
            <div className="mb-8 *:mb-8 md:w-[35%]">
              <ShoppingCartItemSkeleton shoppingCartItemSkeletonClassname="w-28" />
              <ShoppingCartItemSkeleton shoppingCartItemSkeletonClassname="w-28" />
            </div>
            <OrderSummarySkeleton orderSummarySkeletonClassname="lg:w-full mb-8" />
            <ButtonSkeleton />
          </>
        ) : clientSecret && productsWithImgUrlAndQuantity.length > 0 ? (
          <Elements
            stripe={stripePromise}
            options={{
              appearance: { theme: 'stripe' },
              clientSecret,
            }}
          >
            <PaymentForm
              subtotal={subtotal}
              productsWithImgUrlAndQuantity={productsWithImgUrlAndQuantity}
              productsInCartWithSanityProductId={
                productsInCartWithSanityProductId
              }
            />
          </Elements>
        ) : (
          <p>No products to proceed payment</p>
        )}
      </div>
    </main>
  );
}
