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
  const [userProfile, setUserProfile] = useState<Omit<
    User,
    'auth0Id' | 'id'
  > | null>(null);
  const [productsInCart, setProductsInCart] = useState<ProductInShoppingCart[]>(
    []
  );

  useEffect(() => {
    //set user profile state
    if (user && !isLoading) {
      getUserProfileFromClientSide().then(
        (userData: Omit<User, 'auth0Id' | 'id'> | undefined) => {
          if (userData) {
            setUserProfile(userData);
          } else {
            setUserProfile(null);
          }
        }
      );
    }
  }, [user, isLoading]);

  //get products in shopping cart
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
          console.log(e);
        });
    }
  }, [userProfile]);

  //get products in shopping cart when products change
  useEffect(() => {
    if (changeProductsInCart) {
      //get products in user cart
      getProductsInCartFromClientSide()
        .then((products: ProductInShoppingCart[] | undefined) => {
          if (products) {
            setProductsInCart(products);
          }
        })
        .catch((e: any) => {
          console.log(e);
        })
        .finally(() => {
          setChangeProductsInCart(false);
        });
    }
  }, [changeProductsInCart]);

  return (
    <globalStatesContext.Provider
      value={{
        changeProductsInCart,
        setChangeProductsInCart,
        userProfile,
        user,
        isLoading,
        productsInCart,
      }}
    >
      {children}
    </globalStatesContext.Provider>
  );
}
