import { FlagIcon } from '@heroicons/react/20/solid';
import Avatar from './Avatar';
import { formatDateToWords } from '../_lib/formatDateToWords';
import { solidBlurDataUrl } from '../utils/utils';
import { caplitalizeFirstLetterOfAWord } from '../_lib/caplitalizeFirstLetterOfAWord';

interface Props {
  order: Order;
}

export default function AdminOrderItem({ order }: Props) {
  return (
    <li className="border-b border-gray-200 last:border-b-0">
      <div className="flex h-full items-center justify-between rounded-md p-4">
        <div className="flex items-center gap-4">
          <Avatar avatarSrc={order.user?.imgUrl || solidBlurDataUrl} />
          <p className="w-[100px] truncate text-nowrap font-medium">
            {order.user?.name}
          </p>
        </div>

        <p className="max-w-[150px] cursor-default truncate text-nowrap">
          {order.transactionNumber}
        </p>
        <div className="group flex w-[102px] items-center gap-2">
          <FlagIcon className="h-4 w-4 text-green-300 group-hover:text-green-400" />
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
