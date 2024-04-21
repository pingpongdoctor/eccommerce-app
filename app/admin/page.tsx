import AdminOrderList from '../_components/AdminOrderList';
import { getAllOrdersOnServerSide } from '../_lib/getAllOrdersOnServerSide';

export default async function AdminPage() {
  const ordersData = await getAllOrdersOnServerSide();
  return (
    <div className="bg-gray-900 pt-8 md:pt-12">
      <div className="cursor-default px-4 text-white md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
        {/* column name */}
        <div className="flex justify-between border-b-[2px] border-gray-200 p-4 font-medium *:text-center">
          <p className="w-[156px]">User</p>
          <p className="w-[150px]">Order Number</p>
          <p className="w-[102px]">Status</p>
          <p className="w-[100px]">Date Placed</p>
          <p className="w-[100px]">Delivery Date</p>
        </div>

        {/* orders */}
        <AdminOrderList orders={[...ordersData, ...ordersData]} />
      </div>
    </div>
  );
}
