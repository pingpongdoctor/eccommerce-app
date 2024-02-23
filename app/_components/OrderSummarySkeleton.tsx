'use client';
import React from 'react';

interface Props {
  orderSummarySkeletonClassname?: string;
}

export default function OrderSummarySkeleton({
  orderSummarySkeletonClassname,
}: Props) {
  return (
    <div
      className={`h-[329px] w-full animate-pulse rounded-md bg-gray-200 lg:w-[40%] ${orderSummarySkeletonClassname}`}
    ></div>
  );
}
