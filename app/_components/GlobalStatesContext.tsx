'use client';
import React from 'react';
import { createContext, useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { User } from '@prisma/client';
import { getUserProfileFromClientSide } from '../_lib/getUserProfileFromClientSide';
import { getProductsInCartFromClientSide } from '../_lib/getProductsInCartFromClientSide';

export const globalStatesContext = createContext<any>(null);

export default function GlobalStatesContext({
  children,
}: {
  children: React.ReactNode;
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
    if (user) {
      getUserProfileFromClientSide().then(
        (userData: Omit<User, 'auth0Id'> | undefined) => {
          if (userData) {
            setUserProfile(userData);
          } else {
            setUserProfile(null);
          }
        }
      );
    } else {
      setUserProfile(null);
    }
  }, [user]);

  //get products in shopping cart of the current user
  useEffect(() => {
    if (userProfile) {
      //get products in user cart
      getProductsInCartFromClientSide()
        .then((products: ProductInShoppingCart[] | undefined) => {
          if (products) {
            setProductsInCart(products);
          } else {
            setProductsInCart([]);
          }
        })
        .finally(() => {
          setChangeProductsInCart(false);
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
      }}
    >
      {children}
    </globalStatesContext.Provider>
  );
}
