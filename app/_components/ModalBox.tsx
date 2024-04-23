'use client';
import { ReactNode } from 'react';

export default function ModalBox({
  children,
  isOpen = false,
}: {
  children: ReactNode;
  isOpen: boolean;
}) {
  return (
    <div
      className={`fixed left-0 right-0 top-0 mx-auto flex h-[100vh] w-[100vw] animate-modalBoxScaleAnimation items-center justify-center ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      {children}
    </div>
  );
}
