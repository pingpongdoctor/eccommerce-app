import { SanityDocument } from 'next-sanity';
import React from 'react';
import { QueryResponseInitial, useQuery } from '@sanity/react-loader';
import { HOMEPAGE_QUERY } from '@/sanity/lib/queries';
import ClientIntroduceComponent from './ClientIntroduceComponent';

export default function PreviewIntroduceComponent({
  initial,
}: {
  initial: QueryResponseInitial<SanityDocument>;
}) {
  const { data } = useQuery<SanityDocument | null>(
    HOMEPAGE_QUERY,
    {},
    {
      initial,
    }
  );

  return data ? (
    <ClientIntroduceComponent homePageData={data} />
  ) : (
    <div>No introduce component is found</div>
  );
}
