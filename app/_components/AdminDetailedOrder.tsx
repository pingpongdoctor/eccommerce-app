'use client';
import generateOrderInforObject from '../_lib/generateOrderInforObject';
import AdminProductComponent from './AdminProductComponent';
import { XCircleIcon } from '@heroicons/react/20/solid';
import SimpleMenuComponent from './SimpleMenuComponent';
import { updateOrderStatus } from '../_lib/updateOrderStatus';
import { caplitalizeFirstLetterOfWords } from '../_lib/caplitalizeFirstLetterOfWords';
import { useEffect } from 'react';

interface Props {
  order: Order;
  handleCloseModalBox: () => void;
  handleUpdateSetIsOrderStatusUpdatedState: (newState: boolean) => void;
}

export default function AdminDetailedOrder({
  order,
  handleCloseModalBox,
  handleUpdateSetIsOrderStatusUpdatedState,
}: Props) {
  const orderInfor = generateOrderInforObject(order, true);
  const menuItemsAttributeValue = [
    {
      label: 'processing',
      simpleMenuOnclickHandler: async () => {
        if (order.status !== 'processing') {
          await updateOrderStatus(order.id, 'processing');
          handleUpdateSetIsOrderStatusUpdatedState(true);
        }
      },
    },
    {
      label: 'shipping',
      simpleMenuOnclickHandler: async () => {
        if (order.status !== 'shipping') {
          await updateOrderStatus(order.id, 'shipping');
          handleUpdateSetIsOrderStatusUpdatedState(true);
        }
      },
    },
    {
      label: 'delivered',
      simpleMenuOnclickHandler: async () => {
        if (order.status !== 'delivered') {
          await updateOrderStatus(order.id, 'delivered');
          handleUpdateSetIsOrderStatusUpdatedState(true);
        }
      },
    },
  ];

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <div className="relative h-[90%] w-[90%] overflow-auto overscroll-contain rounded-lg bg-white transition-all">
      <div className="mt-8 p-4 pb-0 md:p-8 md:pb-0 lg:p-12 lg:pb-0">
        {/* order infor */}
        <ul className="mb-4 flex list-none flex-wrap justify-between gap-y-4 md:gap-y-6">
          {orderInfor.map((infor) => {
            if (infor.field === 'Status') {
              return (
                <SimpleMenuComponent
                  key={infor.id}
                  menuItems={menuItemsAttributeValue}
                  btnClassname="font-semibold p-2 rounded-[0.42rem] text-white bg-gray-800 hover:bg-gray-900 transition-transform duration-200 active:scale-[0.98]"
                  btnName={`Status: ${caplitalizeFirstLetterOfWords(
                    order.status
                  )}`}
                  postionClassname="-left-[0.2rem]"
                  menuClassname="w-[calc((100%-2rem)/2)] md:w-[calc((100%-8rem)/3)] xl:w-[calc((100%-12rem)/4)]"
                />
              );
            }

            return (
              <li
                key={infor.id}
                className={`flex w-[calc((100%-2rem)/2)] flex-col md:w-[calc((100%-8rem)/3)] xl:w-[calc((100%-12rem)/4)]`}
              >
                <p className="truncate text-nowrap font-medium text-gray-800">
                  {infor.field}
                </p>
                <p className="truncate text-nowrap">{infor.value}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="my-4 h-[1px] w-full bg-gray-300 md:my-8 lg:my-12"></div>

      <ul className="flex flex-col gap-4 p-4 pt-0 md:gap-8 md:p-8 md:pt-0 lg:gap-12 lg:p-12 lg:pt-0">
        {order.purchasedProducts.map((product) => (
          <AdminProductComponent key={product.sanitySlug} product={product} />
        ))}
      </ul>

      <XCircleIcon
        onClick={handleCloseModalBox}
        className="absolute right-2 top-2 h-10 w-10 text-red-700 hover:text-red-800"
      />
    </div>
  );
}
