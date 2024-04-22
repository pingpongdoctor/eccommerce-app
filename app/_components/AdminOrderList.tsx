'use client';
import AdminOrderItem from './AdminOrderItem';

interface Props {
  orders: Order[];
  handleSetDetailedOrderState: (order: Order) => void;
}

export default function AdminOrderList({
  orders,
  handleSetDetailedOrderState,
}: Props) {
  return (
    <ul className="list-none text-sm">
      {orders.map((order) => (
        <AdminOrderItem
          key={order.transactionNumber}
          order={order}
          handleSetDetailedOrderState={handleSetDetailedOrderState}
        />
      ))}
    </ul>
  );
}
