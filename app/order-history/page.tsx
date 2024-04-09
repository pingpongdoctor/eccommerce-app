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

  const data = await getAllOrdersOnServerSide();

  return <div>{/* <p>{data[0].city}</p> */}</div>;
}
