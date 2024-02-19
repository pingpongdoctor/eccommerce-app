'use client';
import ButtonComponent from './ButtonComponent';
import { useRouter } from 'next/navigation';

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
            buttonOnclickHandler={() => {
              router.push('/checkout');
            }}
            buttonName="Check out"
            animate={true}
          />
        )}
      </div>
    </div>
  );
}
