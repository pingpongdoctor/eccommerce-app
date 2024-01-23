'use client';

import { PRODUCT_QUERY } from '@/sanity/lib/queries';
import { QueryResponseInitial, useQuery } from '@sanity/react-loader';
import { QueryParams, SanityDocument } from 'next-sanity';

import ProductDetail from './ProductDetail';
import ClientProductDetail from './ClientProductDetail';

export default function ProductPreview({
  initial,
  params,
}: {
  initial: QueryResponseInitial<Product & SanityDocument>;
  params: QueryParams;
}) {
  const { data } = useQuery<(Product & SanityDocument) | null>(
    PRODUCT_QUERY,
    params,
    {
      initial,
    }
  );

  return data && <ClientProductDetail product={data} />;
}
