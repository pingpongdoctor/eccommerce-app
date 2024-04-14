import Image from 'next/image';
import { solidBlurDataUrl } from '../utils/utils';
import { CheckCircleIcon } from '@heroicons/react/16/solid';

interface Props {
  orderNumber: string;
  datePlaced: string;
  subtotal: number;
  total: number;
}

export default function HistoryOrderItemComponent() {
  const orderInfor = [
    { id: 1, field: 'Order number', value: 'FEWFEWF' },
    { id: 2, field: 'Date Placed', value: 'Jul 6, 2021' },
    { id: 3, field: 'Subtotal', value: '$100' },
    { id: 4, field: 'Total', value: '$123' },
    { id: 5, field: 'Total (include shipping and tax)', value: '$123' },
  ];
  return (
    <div className="rounded-md border border-gray-200">
      {/* order infor */}
      <ul className="mb-4 flex list-none justify-between p-4 pb-0 md:p-8 md:pb-0 lg:p-12 lg:pb-0">
        {orderInfor.map((infor) => (
          <li
            key={infor.id}
            className={`${
              infor.id === 2 || infor.id === 5 ? 'hidden md:block' : ''
            } flex flex-col`}
          >
            <p className="font-medium text-gray-800">{infor.field}</p>
            <p>{infor.value}</p>
          </li>
        ))}
      </ul>

      <div className="my-4 h-[1px] w-full bg-gray-200"></div>

      {/* order product */}
      <div className="p-4 pt-0 md:p-8 md:pt-0 lg:p-12 lg:pt-0">
        <div className="mb-4 flex items-center gap-4 md:items-start">
          <Image
            src={solidBlurDataUrl}
            width={80}
            height={80}
            alt="order-history-image"
            className="h-[80px] w-[80px] rounded-md md:h-[160px] md:w-[160px]"
          />
          <div className="md:grow">
            <div className="flex flex-col gap-2 text-sm font-medium text-gray-800 md:mb-2 md:flex-row md:justify-between">
              <p>Micro Backpack</p>
              <p>$70.00</p>
            </div>
            <p className="hidden md:block">
              Are you a minimalist looking for a compact carry option? The Micro
              Backpack is the perfect size for your essential everyday carry
              items. Wear it like a backpack or carry it like a satchel for
              all-day use.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
          <p>Delivered on July 12, 2021</p>
        </div>
      </div>
    </div>
  );
}
