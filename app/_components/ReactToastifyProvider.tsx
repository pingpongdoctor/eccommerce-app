'use client';
import { ReactNode } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (
  option: 'success' | 'error' | 'info',
  message: string,
  toastId: string
) => {
  toast[option](message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    toastId,
    autoClose: 3000,
    theme: 'dark',
  });
};

export default function ReactToastifyProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <ToastContainer limit={4} />
    </>
  );
}
