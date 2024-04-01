'use client';
import {
  PRODUCTS_QUERY,
  PRODUCTS_QUERY_CUSTOMER_ALSO_BUY,
} from '@/sanity/lib/queries';
import { QueryResponseInitial, useQuery } from '@sanity/react-loader';
import { QueryParams, SanityDocument } from 'next-sanity';
import ClientProductCards from './ClientProductCards';

export default function ProductCardsPreview({
  initial,
}: {
  initial: QueryResponseInitial<(SanityProduct & SanityDocument)[]>;
  isCustomerAlsoBuyData?: boolean;
  params?: QueryParams;
}) {
  const { data } = useQuery<(SanityProduct & SanityDocument)[] | null>(
    PRODUCTS_QUERY,
    {},
    { initial }
  );

  return data && <ClientProductCards products={data} />;
}
