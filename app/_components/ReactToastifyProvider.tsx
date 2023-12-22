"use client";

import React from "react";
import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (
  option: "success" | "error" | "info",
  message: string,
) => {
  toast[option](message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    toastId: option,
    autoClose: 3000,
    theme: "dark",
  });
};

export default function ReactToastifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <ToastContainer limit={3} />
    </div>
  );
}
