'use client';
import HistoryOrderListComponent from '../_components/HistoryOrderListComponent';
import { addImgUrlsToOrders } from '../_lib/addImgUrlsToOrders';
import GoBackBtn from '../_components/GoBackBtn';
import { useContext, useEffect, useState } from 'react';
import { getAllOrdersOnClientSide } from '../_lib/getAllOrdersOnClientSide';
import { globalStatesContext } from '../_components/GlobalStatesContext';
import HistoryOrderSkeletonComponent from '../_components/HistoryOrderSkeletonComponent';

export default function OrderHistoryPage() {
  const { user, isLoading } = useContext(globalStatesContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isFetchingOrder, setIsFetchingOrder] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && user) {
      setIsFetchingOrder(true);

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
        })
        .finally(() => {
          setIsFetchingOrder(false);
        });
    }
  }, [user, isLoading]);

  return (
    <div className="min-h-[60vh] px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
      <GoBackBtn goBackBtnClassname="text-gray-700 mb-4" />
      <h2 className="mb-4">Order history</h2>
      <p className="mb-8">
        Check the status of recent orders, manage returns, and discover similar
        products.
      </p>

      {isFetchingOrder ? (
        <HistoryOrderSkeletonComponent />
      ) : orders.length > 0 ? (
        <HistoryOrderListComponent ordersWithDetailedProducts={orders} />
      ) : (
        <h3>You have not had any orders yet</h3>
      )}
    </div>
  );
}
