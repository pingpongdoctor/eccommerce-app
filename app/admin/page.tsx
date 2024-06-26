'use client';
import {
  ChangeEvent,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import AdminOrderList from '../_components/AdminOrderList';
import { getAllOrdersOnClientSide } from '../_lib/getAllOrdersOnClientSide';
import { globalStatesContext } from '../_components/GlobalStatesContext';
import SimpleMenuComponent from '../_components/SimpleMenuComponent';
import { orderTableColumnsInfor } from '../utils/utils';
import SearchBar from '../_components/SearchBar';
import { formatDateToWords } from '../_lib/formatDateToWords';
import GoBackBtn from '../_components/GoBackBtn';

export default function AdminPage() {
  const { user } = useContext(globalStatesContext);
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [isFetchingOrdersData, setIsFetchingOrdersData] =
    useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string>('');

  //set ordersData state
  useEffect(() => {
    if (user) {
      setIsFetchingOrdersData(true);

      getAllOrdersOnClientSide()
        .then((data: Order[]) => {
          setOrdersData(data);
        })

        .catch((e: any) => {
          console.log('Error when setting ordersData state' + e);
        })
        .finally(() => {
          setIsFetchingOrdersData(false);
        });
    }
  }, [user]);

  const sortingOrdersFunction = function (e: MouseEvent<HTMLParagraphElement>) {
    if (e.currentTarget.innerText === 'User') {
      setOrdersData(
        [...ordersData].sort((a, b) => {
          return (a.user?.name || '').localeCompare(b.user?.name || '');
        })
      );
    }

    if (e.currentTarget.innerText === 'Date Placed') {
      setOrdersData(
        [...ordersData].sort((a, b) => {
          return (
            new Date(a.placedDate).getTime() - new Date(b.placedDate).getTime()
          );
        })
      );
    }

    if (e.currentTarget.innerText === 'Delivery Date') {
      setOrdersData(
        [...ordersData].sort((a, b) => {
          return (
            new Date(a.expectedDeliveryDate).getTime() -
            new Date(b.expectedDeliveryDate).getTime()
          );
        })
      );
    }
  };

  const sortOrdersDataBasedOnStatus = function (status: OrderStatus): void {
    setOrdersData(
      [...ordersData].sort((a, b) => {
        if (a.status === status && b.status !== status) {
          return -1; //put a on the left if a has the status the same with the status argument value
        } else if (a.status !== status && b.status === status) {
          return 1; //put a on the right if a has the status not the same with the status argument value
        } else {
          return 0; //keep a and b having their positions unchannged if they both have or not have the status the same with the status argument value
        }
      })
    );
  };

  const handleUpdateSearchResult = function (e: ChangeEvent<HTMLInputElement>) {
    setSearchResult(e.target.value.toLowerCase());
  };

  const menuItemsAttributeValue = [
    {
      label: 'processing',
      simpleMenuOnclickHandler: () => {
        sortOrdersDataBasedOnStatus('processing');
      },
    },
    {
      label: 'shipping',
      simpleMenuOnclickHandler: () => {
        sortOrdersDataBasedOnStatus('shipping');
      },
    },
    {
      label: 'delivered',
      simpleMenuOnclickHandler: () => {
        sortOrdersDataBasedOnStatus('delivered');
      },
    },
  ];

  return (
    <div className="min-h-[70vh] bg-gray-900 pt-8 md:pt-12">
      <GoBackBtn goBackBtnClassname="px-4 text-white md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl mb-4" />

      {/* search bars */}
      <SearchBar changeEventHanlder={handleUpdateSearchResult} isBlackTheme />
      <div className="cursor-default px-4 text-white md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
        {/* column name */}
        <div className="flex justify-between border-b border-white p-4 font-medium *:text-center">
          {orderTableColumnsInfor.map((infor) => {
            if (infor.name === 'Status') {
              return (
                <SimpleMenuComponent
                  key={infor.name}
                  menuItems={menuItemsAttributeValue}
                  btnClassname="text-white font-semibold w-[111px]"
                  btnName="Status"
                  postionClassname="-left-[1rem]"
                />
              );
            }
            return (
              <p
                key={infor.name}
                className={infor.className}
                onClick={
                  infor.name === 'Status' || infor.name === 'Order Number'
                    ? undefined
                    : sortingOrdersFunction
                }
              >
                {infor.name}
              </p>
            );
          })}
        </div>

        {isFetchingOrdersData ? (
          // Skeleton component
          <div className="h-[50vh] w-full animate-pulse rounded-md bg-gray-800 px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl"></div>
        ) : ordersData.length > 0 ? (
          // Orders
          <AdminOrderList
            orders={ordersData.filter((data) => {
              return (
                (data.fullname as string)
                  .toLowerCase()
                  .includes(searchResult) ||
                data.transactionNumber.toLowerCase().includes(searchResult) ||
                data.status.toLowerCase().includes(searchResult) ||
                formatDateToWords(data.placedDate)
                  .toLowerCase()
                  .includes(searchResult) ||
                formatDateToWords(data.expectedDeliveryDate)
                  .toLowerCase()
                  .includes(searchResult)
              );
            })}
          />
        ) : (
          <h3 className="px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
            There are no orders
          </h3>
        )}
      </div>
    </div>
  );
}
