import Image from 'next/image';
import { incentiveDataArr } from '../utils/utils';

export default function IncentiveComponent() {
  return (
    <div className="flex flex-col items-center px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
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
