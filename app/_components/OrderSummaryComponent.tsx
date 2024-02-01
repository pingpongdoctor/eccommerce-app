'use client';
import React from 'react';
import ButtonComponent from './ButtonComponent';

interface Props {
  orderSummaryComponentClassname?: string;
}

export default function OrderSummaryComponent({
  orderSummaryComponentClassname,
}: Props) {
  const summaryData = [
    {
      text: 'Subtotal',
      ammount: 99,
    },
    {
      text: 'Shipping estimate',
      ammount: 99,
    },
    {
      text: 'Tax estimate',
      ammount: 99,
    },
    {
      text: 'Order total',
      ammount: 99,
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

        <ButtonComponent buttonName="Check out" animate={true} />
      </div>
    </div>
  );
}
