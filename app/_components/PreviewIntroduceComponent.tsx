'use client';
import { SanityDocument } from 'next-sanity';
import { QueryResponseInitial, useQuery } from '@sanity/react-loader';
import { HOMEPAGE_QUERY } from '@/sanity/lib/queries';
import IntroduceClientComponent from './IntroduceClientComponent';

export default function PreviewIntroduceComponent({
  initial,
}: {
  initial: QueryResponseInitial<HomePageData & SanityDocument>;
}) {
  const { data } = useQuery<(HomePageData & SanityDocument) | null>(
    HOMEPAGE_QUERY,
    {},
    {
      initial,
    }
  );

  return data ? (
    <IntroduceClientComponent homePageData={data} />
  ) : (
    <div>No introduce component is found</div>
  );
}
