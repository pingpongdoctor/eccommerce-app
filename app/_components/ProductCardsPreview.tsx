'use client';
import { PRODUCTS_QUERY } from '@/sanity/lib/queries';
import { QueryResponseInitial, useQuery } from '@sanity/react-loader';
import ClientProductCards from './ClientProductCards';
import { QueryParams, SanityDocument } from 'next-sanity';

export default function ProductCardsPreview({
  initial,
  params,
  query,
}: {
  initial: QueryResponseInitial<(SanityProduct & SanityDocument)[]>;
  params?: QueryParams;
  query?: string;
}) {
  const { data } = useQuery<(SanityProduct & SanityDocument)[] | null>(
    query || PRODUCTS_QUERY,
    params,
    { initial }
  );

  return data && <ClientProductCards products={data} />;
}
