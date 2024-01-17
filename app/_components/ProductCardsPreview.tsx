'use client';

import { PRODUCTS_QUERY } from '@/sanity/lib/queries';
import { QueryResponseInitial, useQuery } from '@sanity/react-loader';
import { SanityDocument } from 'next-sanity';
import ClientProductCards from './ClientProductCards';

export default function ProductCardsPreview({
  initial,
}: {
  initial: QueryResponseInitial<(Product & SanityDocument)[]>;
}) {
  const { data } = useQuery<(Product & SanityDocument)[] | null>(
    PRODUCTS_QUERY,
    {},
    { initial }
  );

  return data ? (
    <ClientProductCards products={data} />
  ) : (
    <div className="bg-red-100">No products found</div>
  );
}
