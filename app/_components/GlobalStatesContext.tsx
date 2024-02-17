'use client';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { User } from '@prisma/client';
import { getUserProfileFromClientSide } from '../_lib/getUserProfileFromClientSide';
import { getProductsInCartFromClientSide } from '../_lib/getProductsInCartFromClientSide';

export const globalStatesContext = createContext<any>(null);

export default function GlobalStatesContext({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isLoading } = useUser();
  const [changeProductsInCart, setChangeProductsInCart] =
    useState<boolean>(false);
  const [
    needToRevalidateDataForShoppingCartPage,
    setNeedToRevalidateDataForShoppingCartPage,
  ] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<Omit<User, 'auth0Id'> | null>(
    null
  );
  const [productsInCart, setProductsInCart] = useState<ProductInShoppingCart[]>(
    []
  );

  useEffect(() => {
    //set user profile state
    if (user && !isLoading) {
      getUserProfileFromClientSide().then(
        (userData: Omit<User, 'auth0Id'> | undefined) => {
          if (userData) {
            setUserProfile(userData);
          } else {
            setUserProfile(null);
          }
        }
      );
    }
  }, [user, isLoading]);

  //get products in shopping cart of the current user
  useEffect(() => {
    if (userProfile) {
      //get products in user cart
      getProductsInCartFromClientSide()
        .then((products: ProductInShoppingCart[] | undefined) => {
          if (products) {
            setProductsInCart(products);
          }
        })
        .catch((e: any) => {
          console.log(e.message);
        })
        .finally(() => {
          if (changeProductsInCart === true) {
            setChangeProductsInCart(false);
          }
        });
    }
  }, [userProfile, changeProductsInCart]);

  return (
    <globalStatesContext.Provider
      value={{
        changeProductsInCart,
        setChangeProductsInCart,
        userProfile,
        user,
        isLoading,
        needToRevalidateDataForShoppingCartPage,
        setNeedToRevalidateDataForShoppingCartPage,
        productsInCart,
      }}
    >
      {children}
    </globalStatesContext.Provider>
  );
}
