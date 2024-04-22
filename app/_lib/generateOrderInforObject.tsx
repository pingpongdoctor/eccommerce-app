import { caplitalizeFirstLetterOfWords } from './caplitalizeFirstLetterOfWords';
import { formatDateToWords } from './formatDateToWords';

export default function generateOrderInforObject(
  order: Order,
  isAdminPage = false
) {
  if (isAdminPage) {
    return [
      {
        id: 1,
        field: 'Email',
        value: `${order.email}`,
      },
      {
        id: 2,
        field: 'Full Name',
        value: `${order.fullname}`,
      },
      {
        id: 3,
        field: 'Account',
        value: `${order.user?.name}`,
      },
      {
        id: 4,
        field: 'Deliver To',
        value: `${order.line1} ${order.line2 ? `or ${order.line2}` : ''} ${
          order.city
        } ${order.country} ${order.postal_code} }`,
      },
      { id: 5, field: 'Order number', value: order.transactionNumber },
      {
        id: 6,
        field: 'Date Placed',
        value: formatDateToWords(order.placedDate),
      },
      {
        id: 7,
        field: 'Delivery Date',
        value: formatDateToWords(order.expectedDeliveryDate),
      },
      {
        id: 8,
        field: 'Status',
      },
      {
        id: 9,
        field: 'Sub Total',
        value: `$${order.subtotal}`,
      },
      {
        id: 10,
        field: 'Tax',
        value: `$${order.tax}`,
      },
      {
        id: 11,
        field: 'Shipping',
        value: `$${order.shipping}`,
      },
      {
        id: 12,
        field: 'Total',
        value: `$${
          Number(order.subtotal) + Number(order.tax) + Number(order.shipping)
        }`,
      },
    ];
  }

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
