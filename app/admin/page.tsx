'use client';

import { MouseEvent, useContext, useEffect, useState } from 'react';
import AdminOrderList from '../_components/AdminOrderList';
import { getAllOrdersOnClientSide } from '../_lib/getAllOrdersOnClientSide';
import { globalStatesContext } from '../_components/GlobalStatesContext';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { user, isLoading } = useContext(globalStatesContext);
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [isLoadingOrdersData, setIsLoadingOrdersData] = useState<boolean>(true);
  const router = useRouter();

  const columnsInfor = [
    { name: 'User', className: 'w-[156px]' },
    { name: 'Order Number', className: 'w-[150px]' },
    { name: 'Status', className: 'w-[102px]' },
    { name: 'Date Placed', className: 'w-[100px]' },
    { name: 'Delivery Date', className: 'w-[100px]' },
  ];
  //protect this page from unauthenticated users
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  //set ordersData state
  useEffect(() => {
    if (user) {
      getAllOrdersOnClientSide()
        .then((data) => {
          setOrdersData(data);
        })
        .catch((e: any) => {
          console.log('Error when setting ordersData state' + e);
        })
        .finally(() => {
          setIsLoadingOrdersData(false);
        });
    }
  }, [user]);

  //sortingOrdersFunction
  const sortingOrdersFunction = function (e: MouseEvent<HTMLParagraphElement>) {
    if (e.currentTarget.innerText === 'User') {
      setOrdersData(
        [...ordersData].sort((a, b) => {
          return (a.user?.name || '').localeCompare(b.user?.name || '');
        })
      );
    }

    if (e.currentTarget.innerText === 'Date Placed') {
      setOrdersData(
        [...ordersData].sort((a, b) => {
          return (
            new Date(a.placedDate).getTime() - new Date(b.placedDate).getTime()
          );
        })
      );
    }

    if (e.currentTarget.innerText === 'Delivery Date') {
      setOrdersData(
        [...ordersData].sort((a, b) => {
          return (
            new Date(a.expectedDeliveryDate).getTime() -
            new Date(b.expectedDeliveryDate).getTime()
          );
        })
      );
    }
  };

  return (
    <div className="min-h-[70vh] bg-gray-900 pt-8 md:pt-12">
      {isLoadingOrdersData && (
        <div className="h-[50vh] w-full animate-pulse rounded-md bg-gray-800 px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl"></div>
      )}

      {ordersData.length > 0 && (
        <div className="cursor-default px-4 text-white md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
          {/* column name */}
          <div className="flex justify-between border-b-[2px] border-gray-200 p-4 font-medium *:text-center">
            {columnsInfor.map((infor) => (
              <p
                key={infor.name}
                className={infor.className}
                onClick={
                  infor.name === 'Status' || infor.name === 'Order Number'
                    ? undefined
                    : sortingOrdersFunction
                }
              >
                {infor.name}
              </p>
            ))}
          </div>

          {/* orders */}
          <AdminOrderList orders={ordersData} />
        </div>
      )}

      {!isLoadingOrdersData && ordersData.length === 0 && (
        <h3 className="px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
          There are no orders
        </h3>
      )}
    </div>
  );
}
