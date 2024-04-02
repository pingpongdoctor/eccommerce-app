'use client';

import { SanityDocument } from 'next-sanity';
import CustomizedSanityPortableTextComponent from './CustomizedSanityPortableTextComponent';
import { client } from '@/sanity/lib/client';
import { AUTHOR_QUERY } from '@/sanity/lib/queries';
import { builder } from '../utils/imageBuilder';
import { formatDateToWords } from '../_lib/formatDateToWords';
import AvatarClientComponent from './AvatarClientComponent';
import { useEffect, useState } from 'react';

interface Props {
  blog: SanityBlog & SanityDocument;
}

export default function BlogClientComponent({ blog }: Props) {
  const { title, content, author, _updatedAt } = blog;
  const [authorData, setAuthorData] = useState<
    (SanityAuthor & SanityDocument) | null
  >(null);

  useEffect(() => {
    client
      .fetch<SanityAuthor & SanityDocument>(
        AUTHOR_QUERY,
        { id: author._ref },
        {}
      )
      .then((data: SanityAuthor & SanityDocument) => {
        if (!data) {
          setAuthorData(null);
          return;
        }
        setAuthorData(data);
      })
      .catch((e: any) => {
        console.log('Error when fetching author data' + e);
      });
  });

  return (
    <div className="px-4 text-base tracking-wide text-gray-600 antialiased md:px-8 lg:px-12 xl:mx-auto xl:max-w-4xl [&_p]:mb-4">
      <p className="text-sm">{formatDateToWords(_updatedAt)}</p>
      <h2 className="mb-4 font-extrabold">{title}</h2>
      {authorData && (
        <div className="mb-8 flex items-center gap-3">
          <AvatarClientComponent
            avatarSrc={builder.image(authorData.image).quality(80).url()}
            avatarPriority
          />
          <div>
            <p className="!m-0 text-gray-900">{authorData.name}</p>
          </div>
        </div>
      )}
      <CustomizedSanityPortableTextComponent value={content} />
    </div>
  );
}
