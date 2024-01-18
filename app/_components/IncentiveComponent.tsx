import React from 'react';
import Image from 'next/image';
import truckIcon from '../../public/truck.svg';
import medalIcon from '../../public/medal.svg';
import supportIcon from '../../public/support.svg';

const incentiveDataArr = [
  {
    id: '1',
    icon: truckIcon,
    mainText: 'Free shipping',
    text: 'It is not actually free we just price it into the products. Someone is paying for it, and it is not us.',
  },
  {
    id: '2',
    icon: medalIcon,
    mainText: 'Quality Assurance',
    text: 'We meticulously test each product, ensuring a symphony of quality that resonates with trust and excellence.',
  },
  {
    id: '3',
    icon: supportIcon,
    mainText: 'Exchanges',
    text: "We've got your back with an easy-breezy product exchange. It's like a friendly swap dance where you leave with a smile.",
  },
];

export default function IncentiveComponent() {
  return (
    <div className="mx-auto flex flex-col items-center px-4 md:px-8 lg:px-12 xl:max-w-7xl">
      <h3 className="mb-8">We built our business on customer service</h3>
      <ul className="flex list-none flex-col gap-8 lg:flex-row">
        {incentiveDataArr.map((ele) => (
          <li
            key={ele.id}
            className="flex gap-8 lg:flex-1 lg:flex-col lg:items-center lg:gap-0"
          >
            <Image
              src={ele.icon}
              alt="truck-icon"
              width={70}
              height={70}
              className="mb-4"
            />
            <div>
              <p className="mb-2 font-medium lg:text-center">{ele.mainText}</p>
              <p className="text-pretty text-gray-500 lg:text-center">
                {ele.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
