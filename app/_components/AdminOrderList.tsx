'use client';
import Link from 'next/link';
import AdminOrderItem from './AdminOrderItem';

interface Props {
  orders: Order[];
}

export default function AdminOrderList({ orders }: Props) {
  return (
    <div className="text-sm">
      {orders.map((order) => (
        <Link
          href={`/admin/${order.id}`}
          key={order.id}
          className="block border-b border-gray-300 last:border-b-0 hover:bg-gray-800"
        >
          {' '}
          <AdminOrderItem order={order} />
        </Link>
      ))}
    </div>
  );
}
