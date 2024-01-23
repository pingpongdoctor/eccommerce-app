'use client';

import {
  PRODUCTS_QUERY,
  PRODUCTS_QUERY_CUSTOMER_ALSO_BUY,
} from '@/sanity/lib/queries';
import { QueryResponseInitial, useQuery } from '@sanity/react-loader';
import { SanityDocument } from 'next-sanity';
import ClientProductCards from './ClientProductCards';

export default function ProductCardsPreview({
  initial,
  isCustomerAlsoBuyData = false,
  customerAlsoBuyCategory = 'comestic',
}: {
  initial: QueryResponseInitial<(SanityProduct & SanityDocument)[]>;
  isCustomerAlsoBuyData?: boolean;
  customerAlsoBuyCategory?: Categories;
}) {
  const { data } = useQuery<(SanityProduct & SanityDocument)[] | null>(
    isCustomerAlsoBuyData ? PRODUCTS_QUERY_CUSTOMER_ALSO_BUY : PRODUCTS_QUERY,
    isCustomerAlsoBuyData ? { category: customerAlsoBuyCategory } : {},
    { initial }
  );

  return data && <ClientProductCards products={data} />;
}
