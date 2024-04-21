import { caplitalizeFirstLetterOfWords } from './caplitalizeFirstLetterOfWords';
import { formatDateToWords } from './formatDateToWords';

export default function generateOrderInforObject(order: Order) {
  return [
    { id: 1, field: 'Order number', value: order.transactionNumber },
    {
      id: 2,
      field: 'Date Placed',
      value: formatDateToWords(order.placedDate),
    },
    {
      id: 3,
      field: 'Status',
      value: `${caplitalizeFirstLetterOfWords(order.status)}`,
    },
    {
      id: 4,
      field: 'Total',
      value: `$${
        Number(order.subtotal) + Number(order.tax) + Number(order.shipping)
      }`,
    },
    {
      id: 5,
      field: 'Total (include shipping and tax)',
      value: `$${
        Number(order.subtotal) + Number(order.tax) + Number(order.shipping)
      }`,
    },
  ];
}
