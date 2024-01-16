import { SanityDocument } from 'next-sanity';
import React from 'react';
import { QueryResponseInitial, useQuery } from '@sanity/react-loader';

export default function PreviewIntroduceComponent(
  intial: QueryResponseInitial<SanityDocument[]>
) {
  const data;
  return <div>PreviewIntroduceComponent</div>;
}
