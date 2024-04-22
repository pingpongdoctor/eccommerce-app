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
import { useRouter } from 'next/navigation';
import SimpleMenuComponent from '../_components/SimpleMenuComponent';
import { orderTableColumnsInfor } from '../utils/utils';
import SearchBar from '../_components/SearchBar';
import { formatDateToWords } from '../_lib/formatDateToWords';
import AdminDetailedOrder from '../_components/AdminDetailedOrder';
import { addImgUrlsAndDescriptionToOrders } from '../_lib/addImgUrlsToOrders';
import ModalBox from '../_components/ModalBox';

export default function AdminPage() {
  const { user, isLoading } = useContext(globalStatesContext);
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [isLoadingOrdersData, setIsLoadingOrdersData] = useState<boolean>(true);
  const [searchResult, setSearchResult] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [detailedOrder, setDetailedOrder] = useState<Order | null>(null);

  const router = useRouter();

  //protect this page from unauthenticated users
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  //set ordersData state
  useEffect(() => {
    if (user) {
      getAllOrdersOnClientSide()
        .then((data) => {
          return addImgUrlsAndDescriptionToOrders(data);
        })
        .then((ordersWithDetailedProducts) => {
          setOrdersData(ordersWithDetailedProducts);
        })
        .catch((e: any) => {
          console.log('Error when setting ordersData state' + e);
        })
        .finally(() => {
          setIsLoadingOrdersData(false);
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

  const handleSetDetailedOrderState = function (order: Order) {
    setDetailedOrder(order);
    setIsOpen(true);
  };

  const handleCloseModalBox = function () {
    setDetailedOrder(null);
    setIsOpen(false);
  };

  return (
    <div className="min-h-[70vh] bg-gray-900 pt-8 md:pt-12">
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
                  menuItems={[
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
                  ]}
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

        {/* Skeleton component */}
        {isLoadingOrdersData && (
          <div className="h-[50vh] w-full animate-pulse rounded-md bg-gray-800 px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl"></div>
        )}

        {/* orders */}
        {ordersData.length > 0 && (
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
            handleSetDetailedOrderState={handleSetDetailedOrderState}
          />
        )}
      </div>

      {!isLoadingOrdersData && ordersData.length === 0 && (
        <h3 className="px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
          There are no orders
        </h3>
      )}

      {detailedOrder && (
        <ModalBox isOpen={isOpen}>
          <AdminDetailedOrder
            order={detailedOrder}
            handleCloseModalBox={handleCloseModalBox}
          />
        </ModalBox>
      )}
    </div>
  );
}
