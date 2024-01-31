import React from 'react';

export default function OrderSummaryComponent() {
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
  ];
  return (
    <div className="bg-gray-300 p-4 md:p-8">
      <h3>Order Summanry</h3>
      {summaryData.map((ele) => (
        <div key={ele.text} className="flex justify-between">
          <p>{ele.text}</p>
          <p>{ele.ammount}</p>
        </div>
      ))}
    </div>
  );
}
