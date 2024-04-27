import { SanityDocument } from 'next-sanity';
import CustomizedSanityPortableTextComponent from './CustomizedSanityPortableTextComponent';
import { client } from '@/sanity/lib/client';
import { AUTHOR_QUERY } from '@/sanity/lib/queries';
import Avatar from './Avatar';
import { builder } from '../utils/imageBuilder';
import { formatDateToWords } from '../_lib/formatDateToWords';

interface Props {
  blog: SanityBlog & SanityDocument;
}

export default async function BlogComponent({ blog }: Props) {
  const { title, content, author, _updatedAt } = blog;
  const { name, image } = await client.fetch<SanityAuthor & SanityDocument>(
    AUTHOR_QUERY,
    { id: author._ref },
    {
      next: { tags: ['blog'], revalidate: 3600 },
    }
  );

  return (
    <div className="px-4 text-base tracking-wide text-gray-600 antialiased md:px-8 lg:px-12 xl:mx-auto xl:max-w-4xl [&_p]:mb-4">
      <h2 className="mb-4 font-extrabold">{title}</h2>
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <Avatar
            avatarSrc={builder.image(image).quality(80).url()}
            avatarPriority
          />
          <div>
            <p className="!m-0 text-gray-900">{name}</p>
          </div>
        </div>
        <p className="text-sm">{formatDateToWords(_updatedAt)}</p>
      </div>
      <CustomizedSanityPortableTextComponent value={content} />
    </div>
  );
}
