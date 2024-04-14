// import Image from 'next/image';
// import { CheckCircleIcon } from '@heroicons/react/16/solid';
// import { formatDateToWords } from '../_lib/formatDateToWords';
// import HistoryOrderProduct from './HistoryOrderProduct';

// interface Props {
//   order: Order;
// }

// export default function HistoryOrderItemComponent({ order }: Props) {
//   const orderInfor = [
//     { id: 1, field: 'Order number', value: order.transactionNumber },
//     {
//       id: 2,
//       field: 'Date Placed',
//       value: formatDateToWords(order.placedDate),
//     },
//     { id: 3, field: 'Subtotal', value: order.subtotal },
//     {
//       id: 4,
//       field: 'Total',
//       value:
//         Number(order.subtotal) + Number(order.tax) + Number(order.shipping),
//     },
//     {
//       id: 5,
//       field: 'Total (include shipping and tax)',
//       value:
//         Number(order.subtotal) + Number(order.tax) + Number(order.shipping),
//     },
//   ];
//   return (
//     <li className="rounded-md border border-gray-200">
//       {/* order infor */}
//       <ul className="mb-4 flex list-none justify-between p-4 pb-0 md:p-8 md:pb-0 lg:p-12 lg:pb-0">
//         {orderInfor.map((infor) => (
//           <li
//             key={infor.id}
//             className={`${
//               infor.id === 2 || infor.id === 5 ? 'hidden md:block' : ''
//             } flex flex-col`}
//           >
//             <p className="font-medium text-gray-800">{infor.field}</p>
//             <p>{infor.value}</p>
//           </li>
//         ))}
//       </ul>

//       <div className="flex gap-2">
//         <CheckCircleIcon className="h-6 w-6 text-green-500" />
//         <p>{formatDateToWords(order.expectedDeliveryDate)}</p>
//       </div>

//       <div className="my-4 h-[1px] w-full bg-gray-200"></div>

//       {order.products.map((product) => (
//         <HistoryOrderProduct
//           priceAtTheOrderTime={product.priceAtTheOrderTime}
//           quantity={product.quantity}
//           product={product.product}
//         />
//       ))}
//     </li>
//   );
// }
