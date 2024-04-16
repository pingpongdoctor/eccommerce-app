import { CheckCircleIcon } from '@heroicons/react/16/solid';
import { formatDateToWords } from '../_lib/formatDateToWords';
import HistoryOrderProduct from './HistoryOrderProduct';
import generateOrderInforObject from '../_lib/generateOrderInforObject';

interface Props {
  order: Order;
}

export default function HistoryOrderItemComponent({ order }: Props) {
  const orderInfor = generateOrderInforObject(order);

  return (
    <li className="rounded-md border border-gray-200">
      <div className="p-4 pb-0 md:p-8 md:pb-0 lg:p-12 lg:pb-0">
        {/* order infor */}
        <ul className="mb-4 flex list-none justify-between">
          {orderInfor.map((infor) => (
            <li
              key={infor.id}
              className={`${
                infor.id === 2 || infor.id === 5 ? 'hidden md:block' : ''
              } ${infor.id === 4 ? 'block md:hidden' : ''} flex flex-col`}
            >
              <p className="font-medium text-gray-800">{infor.field}</p>
              <p
                className={`${
                  infor.id === 1
                    ? 'max-w-[120px] truncate text-nowrap md:max-w-[200px]'
                    : ''
                }`}
              >
                {infor.value}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
          <p>{formatDateToWords(order.expectedDeliveryDate)}</p>
        </div>
      </div>

      <div className="my-4 h-[1px] w-full bg-gray-200 md:my-8"></div>

      <ul className="flex flex-col gap-8 p-4 pt-0 md:gap-12 md:p-8 md:pt-0 lg:p-12 lg:pt-0">
        {order.purchasedProducts.map((product) => (
          <HistoryOrderProduct key={product.sanitySlug} product={product} />
        ))}
      </ul>
    </li>
  );
}
