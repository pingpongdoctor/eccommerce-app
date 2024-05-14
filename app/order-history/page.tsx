'use client';
import HistoryOrderListComponent from '../_components/HistoryOrderListComponent';
import { addImgUrlsToOrders } from '../_lib/addImgUrlsToOrders';
import GoBackBtn from '../_components/GoBackBtn';
import { useContext, useEffect, useState } from 'react';
import { getAllOrdersOnClientSide } from '../_lib/getAllOrdersOnClientSide';
import { globalStatesContext } from '../_components/GlobalStatesContext';

export default function OrderHistoryPage() {
  const { user, isLoading } = useContext(globalStatesContext);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isLoading && user) {
      getAllOrdersOnClientSide()
        .then((ordersWithoutDetailedProducts: Order[]) => {
          return addImgUrlsToOrders(ordersWithoutDetailedProducts);
        })
        .then((ordersWithDetailedProducts: Order[]) => {
          setOrders(ordersWithDetailedProducts);
        })
        .catch((e: any) => {
          console.log(
            'Error when getting all orders in order-history page' + e
          );
        });
    }
  }, [user, isLoading]);

  if (orders.length > 0) {
    return (
      <div className="px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
        <GoBackBtn goBackBtnClassname="text-gray-700 mb-4" />
        <h2 className="mb-4">Order history</h2>
        <p className="mb-8">
          Check the status of recent orders, manage returns, and discover
          similar products.
        </p>

        <HistoryOrderListComponent ordersWithDetailedProducts={orders} />
      </div>
    );
  } else {
    return (
      <h3 className="h-[60vh] px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
        You have not had any orders yet
      </h3>
    );
  }
}
