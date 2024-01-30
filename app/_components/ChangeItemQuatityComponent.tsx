'use client';
import ListComponent from './ListComponent';
import { generateProductInstockList } from '../_lib/generateProductInstockList';
import { SanityDocument } from 'next-sanity';
import { updateProductQuantityForProductsInCart } from '../_lib/updateProductQuantityForProductsInCart';

interface Props {
  product: ProductWithImgUrl & SanityDocument;
}

export default function ChangeItemQuatityComponent({ product }: Props) {
  const handleUpdateProductQuantity = async function (value: number) {
    await updateProductQuantityForProductsInCart(value, product.slug.current);
  };
  return (
    <div>
      <ListComponent
        selectedValue={product.instock}
        listData={generateProductInstockList(product.instock)}
      />
    </div>
  );
}
