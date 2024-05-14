'use client';
import HistoryOrderItemComponent from './HistoryOrderItemComponent';

interface Props {
  ordersWithDetailedProducts: Order[];
}

export default function HistoryOrderListComponent({
  ordersWithDetailedProducts,
}: Props) {
  return (
    <ul className="flex flex-col gap-8 md:gap-12">
      {ordersWithDetailedProducts.map((order: Order) => (
        <HistoryOrderItemComponent
          key={order.transactionNumber}
          order={order}
        />
      ))}
    </ul>
  );
}
