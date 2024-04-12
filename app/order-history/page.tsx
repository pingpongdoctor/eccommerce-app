import { redirect } from 'next/navigation';
import { getAllOrdersOnServerSide } from '../_lib/getAllOrdersOnServerSide';
import { getUserProfileFromServer } from '../_lib/getUserProfileFromServer';
import { notify } from '../_components/ReactToastifyProvider';

export const dynamic = 'force-dynamic';

export default async function OrderHistoryPage() {
  const userData = await getUserProfileFromServer();

  if (!userData) {
    notify(
      'info',
      'can not access the order history page unless you log in',
      'not-authenticated'
    );
    redirect('/');
  }

  const data: OrderWithProductSlugs[] = await getAllOrdersOnServerSide();

  return (
    <div>
      <h2>Order history</h2>
      <p>
        Check the status of recent orders, manage returns, and discover similar
        products.
      </p>

      <div>
        <div>
          <p>Transaction number</p>
          <p>{data[0].transactionNumber}</p>
        </div>
        <div>
          <p>Total amount</p>
          <p>{data[0].subtotal + data[0].shipping + data[0].tax}</p>
        </div>
      </div>
    </div>
  );
}
