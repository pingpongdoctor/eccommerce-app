'use client';
import { SanityDocument } from 'next-sanity';
import CheckoutItem from './CheckoutItem';

interface Props {
  productsWithImgUrlAndQuantity: (ProductWithImgUrl &
    SanityDocument & { productQuantity: number })[];
  checkoutListClassname?: string;
  subtotal: number;
  shipping: number;
  tax: number;
}

export default function CheckoutList({
  productsWithImgUrlAndQuantity,
  checkoutListClassname,
  subtotal,
  shipping,
  tax,
}: Props) {
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
      text: 'Total',
      ammount: subtotal + shipping + tax,
    },
  ];
  return (
    <div className={`mb-8 *:mb-8 lg:mb-12 ${checkoutListClassname}`}>
      {productsWithImgUrlAndQuantity.map(
        (
          product: ProductWithImgUrl &
            SanityDocument & { productQuantity: number }
        ) => (
          <CheckoutItem key={product._id} product={product} />
        )
      )}

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
    </div>
  );
}
