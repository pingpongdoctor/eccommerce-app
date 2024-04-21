import React from 'react';
import AdminOrderItem from './AdminOrderItem';

interface Props {
  orders: Order[];
}

export default function AdminOrderList({ orders }: Props) {
  return (
    <ul className="list-none text-sm">
      {orders.map((order) => (
        <AdminOrderItem key={order.transactionNumber} order={order} />
      ))}
    </ul>
  );
}
