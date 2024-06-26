'use client';
import { PRODUCT_QUERY } from '@/sanity/lib/queries';
import { QueryResponseInitial, useQuery } from '@sanity/react-loader';
import { QueryParams, SanityDocument } from 'next-sanity';
import ProductDetailClientComponent from './ProductDetailClientComponent';

export default function ProductPreview({
  initial,
  params,
}: {
  initial: QueryResponseInitial<SanityProduct & SanityDocument>;
  params: QueryParams;
}) {
  const { data } = useQuery<(SanityProduct & SanityDocument) | null>(
    PRODUCT_QUERY,
    params,
    {
      initial,
    }
  );

  return data && <ProductDetailClientComponent product={data} />;
}
