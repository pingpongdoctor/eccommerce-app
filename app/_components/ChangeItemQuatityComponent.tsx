'use client';
import ListComponent from './ListComponent';
import { generateProductInstockList } from '../_lib/generateProductInstockList';
import { useState } from 'react';
import { SanityDocument } from 'next-sanity';

interface Props {
  product: ProductWithImgUrl & SanityDocument;
}

export default function ChangeItemQuatityComponent({ product }: Props) {
  return (
    <div>
      <ListComponent
        selectedValue={product.instock}
        listData={generateProductInstockList(product.instock)}
      />
    </div>
  );
}
