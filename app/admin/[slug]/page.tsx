'use client';
import AdminProductComponent from '@/app/_components/AdminProductComponent';
import { globalStatesContext } from '@/app/_components/GlobalStatesContext';
import GoBackBtn from '@/app/_components/GoBackBtn';
import HistoryOrderSkeletonComponent from '@/app/_components/HistoryOrderSkeletonComponent';
import SimpleMenuComponent from '@/app/_components/SimpleMenuComponent';
import { addImgUrlsToOrders } from '@/app/_lib/addImgUrlsToOrders';
import { caplitalizeFirstLetterOfWords } from '@/app/_lib/caplitalizeFirstLetterOfWords';
import generateOrderInforObject from '@/app/_lib/generateOrderInforObject';
import { getOrderOnClientSide } from '@/app/_lib/getOrderOnClientSide';
import { updateOrderStatus } from '@/app/_lib/updateOrderStatus';
import { useContext, useEffect, useState } from 'react';

export default function AdminOrderDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { user, isLoading } = useContext(globalStatesContext);
  const [order, setOrder] = useState<Order | null>(null);
  const [isFetchingOrder, setIsFetchingOrder] = useState<boolean>(false);
  const [isStatusUpdated, setIsStatusUpdated] = useState<boolean>(false);

  //fetch order data
  useEffect(() => {
    if (!isLoading && user) {
      setIsFetchingOrder(true);

      getOrderOnClientSide(Number(params.slug))
        .then((order: Order | undefined) => {
          if (!order) {
            return null;
          }

          return addImgUrlsToOrders([order]);
        })
        .then((order: Order[] | null) => {
          if (!order) {
            setOrder(null);
          } else {
            setOrder(order[0]);
          }
        })
        .catch((e: any) => {
          console.log('Error when fetching order data' + e);
        })
        .finally(() => {
          setIsFetchingOrder(false);
        });
    }
  }, [user, params.slug]);

  //update order data when order status changes
  useEffect(() => {
    if (isStatusUpdated) {
      getOrderOnClientSide(Number(params.slug))
        .then((order: Order | undefined) => {
          if (!order) {
            return null;
          }

          return addImgUrlsToOrders([order]);
        })
        .then((order: Order[] | null) => {
          if (!order) {
            setOrder(null);
          } else {
            setOrder(order[0]);
          }
        })
        .catch((e: any) => {
          console.log('Error when re-fetching order data' + e);
        })
        .finally(() => {
          setIsStatusUpdated(false);
        });
    }
  }, [isStatusUpdated, params.slug]);

  //generate information object to render an order
  const orderInfor = order && generateOrderInforObject(order, true);

  //function to update order status
  const handleStatusUpdate = async (
    order: Order,
    updatedStatus: OrderStatus
  ) => {
    try {
      const { id, email, transactionNumber, fullname } = order;

      if (!email || !fullname) {
        throw new Error('Invalid input data');
      }

      await updateOrderStatus(
        id,
        updatedStatus,
        email, //from email
        'thanhnhantran1501@gmail.com', //to email
        transactionNumber,
        fullname
      );
      setIsStatusUpdated(true);
    } catch (error) {
      console.log('Error updating order status: ' + error);
    }
  };

  //function that returns value for menuitems attribute in SimpleMenu component
  const returnMenuItemsValue = function (order: Order) {
    return [
      {
        label: 'processing',
        simpleMenuOnclickHandler: async () => {
          if (order.status !== 'processing') {
            handleStatusUpdate(order, 'processing');
          }
        },
      },
      {
        label: 'shipping',
        simpleMenuOnclickHandler: async () => {
          if (order.status !== 'shipping') {
            handleStatusUpdate(order, 'shipping');
          }
        },
      },
      {
        label: 'delivered',
        simpleMenuOnclickHandler: async () => {
          if (order.status !== 'delivered') {
            handleStatusUpdate(order, 'delivered');
          }
        },
      },
    ];
  };
  return (
    <div className="bg-gray-900 px-4 text-white">
      <div className="min-h-[70vh] pt-8 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
        <GoBackBtn goBackBtnClassname="text-white" />

        {/* skeleton component */}
        {isFetchingOrder ? (
          <HistoryOrderSkeletonComponent />
        ) : order ? (
          <div className="rounded-xl border border-gray-300">
            {/* order infor */}
            <ul className="flex list-none flex-wrap justify-between gap-y-4 border-b border-gray-300 p-4 pb-2 md:gap-y-6 md:p-8 md:pb-4 lg:p-12 lg:pb-6">
              {orderInfor &&
                orderInfor.map((infor) => {
                  if (infor.field === 'Status') {
                    return (
                      <SimpleMenuComponent
                        key={infor.id}
                        menuItems={returnMenuItemsValue(order)}
                        btnClassname="font-semibold p-2 rounded-[0.42rem] text-white bg-gray-700 hover:bg-gray-800 transition-transform duration-200 active:scale-[0.98]"
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
                      <p className="truncate text-nowrap font-semibold">
                        {infor.field}
                      </p>
                      <p className="truncate text-nowrap">{infor.value}</p>
                    </li>
                  );
                })}
            </ul>

            <ul className="flex flex-col gap-4 p-4 pt-0 md:gap-8 md:p-8 md:pt-0 lg:gap-12 lg:p-12 lg:pt-0">
              {order &&
                order.purchasedProducts.map((product) => (
                  <AdminProductComponent
                    key={product.sanitySlug}
                    product={product}
                  />
                ))}
            </ul>
          </div>
        ) : (
          <h3 className="px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
            There are no orders
          </h3>
        )}
      </div>
    </div>
  );
}
