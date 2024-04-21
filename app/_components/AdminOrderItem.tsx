'use client';
import { FlagIcon } from '@heroicons/react/20/solid';
import Avatar from './Avatar';
import { formatDateToWords } from '../_lib/formatDateToWords';
import { solidBlurDataUrl, statusDesign } from '../utils/utils';
import { caplitalizeFirstLetterOfAWord } from '../_lib/caplitalizeFirstLetterOfAWord';

interface Props {
  order: Order;
}

export default function AdminOrderItem({ order }: Props) {
  return (
    <li className="border-b border-gray-200 last:border-b-0 hover:bg-gray-800">
      <div className="flex h-full items-center justify-between rounded-md p-4">
        <div className="flex items-center gap-4">
          <Avatar avatarSrc={order.user?.imgUrl || solidBlurDataUrl} />
          <p className="w-[100px] truncate text-nowrap font-medium">
            {order.fullname}
          </p>
        </div>

        <p className="max-w-[150px] cursor-default truncate text-nowrap">
          {order.transactionNumber}
        </p>
        <div className="group flex w-[102px] items-center gap-2">
          <div
            className={`group flex h-8 w-8 items-center justify-center rounded-full ${
              statusDesign[order.status].background
            }`}
          >
            <FlagIcon
              className={`h-4 w-4 ${statusDesign[order.status].flag}`}
            />
          </div>
          <p className="font-medium">
            {caplitalizeFirstLetterOfAWord(order.status)}
          </p>
        </div>
        <p className="w-[100px] text-center">
          {formatDateToWords(order.placedDate)}
        </p>
        <p className="w-[100px] text-center">
          {formatDateToWords(order.expectedDeliveryDate)}
        </p>
      </div>
    </li>
  );
}
