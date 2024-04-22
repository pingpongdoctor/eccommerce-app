'use client';
import generateOrderInforObject from '../_lib/generateOrderInforObject';
import AdminProductComponent from './AdminProductComponent';
import { XCircleIcon } from '@heroicons/react/20/solid';
import SimpleMenuComponent from './SimpleMenuComponent';

interface Props {
  order: Order;
  handleCloseModalBox: () => void;
}

export default function AdminDetailedOrder({
  order,
  handleCloseModalBox,
}: Props) {
  const orderInfor = generateOrderInforObject(order, true);

  return (
    <div className="relative h-[90%] w-[90%] overflow-auto overscroll-contain rounded-lg bg-white transition-all">
      <div className="mt-8 p-4 pb-0 md:p-8 md:pb-0 lg:p-12 lg:pb-0">
        {/* order infor */}
        <ul className="mb-4 flex list-none flex-wrap justify-between gap-y-4 md:gap-y-6">
          {orderInfor.map((infor) => {
            if (infor.field === 'Status') {
              return (
                <SimpleMenuComponent
                  key={infor.field}
                  menuItems={[
                    {
                      label: 'processing',
                      simpleMenuOnclickHandler: () => {},
                    },
                    {
                      label: 'shipping',
                      simpleMenuOnclickHandler: () => {},
                    },
                    {
                      label: 'delivered',
                      simpleMenuOnclickHandler: () => {},
                    },
                  ]}
                  btnClassname="text-white font-semibold w-[111px]"
                  btnName="Status"
                  postionClassname="-left-[1rem]"
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
