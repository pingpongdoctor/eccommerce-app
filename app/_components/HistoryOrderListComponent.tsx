import HistoryOrderItemComponent from './HistoryOrderItemComponent';

interface Props {
  ordersWithDetailedProducts: Order[];
}

export default function HistoryOrderListComponent({
  ordersWithDetailedProducts,
}: Props) {
  return (
    <ul>
      {ordersWithDetailedProducts.map((order: Order) => (
        <HistoryOrderItemComponent
          key={order.transactionNumber}
          order={order}
        />
      ))}
    </ul>
  );
}
