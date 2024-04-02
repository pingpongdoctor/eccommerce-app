'use client';
import Avatar from './Avatar';
import { builder } from '../utils/imageBuilder';
import Image from 'next/image';
import { solidBlurDataUrl } from '../utils/utils';

interface Props {
  blog: BlogsWithDetailedAuthorData;
  blogCardClassname?: string;
}

export default function BlogCard({ blog, blogCardClassname }: Props) {
  return (
    <div
      className={`relative aspect-[3/1] w-full rounded-2xl sm:w-[80%] lg:aspect-[1/1.15] lg:w-full ${blogCardClassname}`}
    >
      <div className="absolute left-0 top-0 z-[1] h-full w-full rounded-2xl bg-gradient-to-t from-gray-800"></div>
      <Image
        src={blog.imageUrl}
        width={300}
        height={450}
        alt="blog-image"
        placeholder="blur"
        blurDataURL={solidBlurDataUrl}
        className="absolute left-0 top-0 z-0 h-full w-full rounded-2xl object-cover"
      />
      <div className="absolute bottom-0 left-0 z-[2] w-full rounded-2xl p-4 pb-2 sm:p-8 sm:pb-4 md:pb-8  lg:p-4 lg:pb-6">
        <div className="mb-3 flex items-center gap-4 text-xs text-gray-300 md:mb-4 lg:gap-2 xl:gap-4">
          <p>{new Date(blog._updatedAt).toLocaleDateString()}</p>
          <div className="h-1 w-1 rounded-full bg-gray-400"></div>
          <div className="flex items-center gap-3 lg:gap-2">
            <Avatar
              avatarSrc={builder.image(blog.authorData.image).quality(80).url()}
              avatarPriority={false}
              avatarClassname="w-[35px] h-[35px]"
            />
            <p className="line-clamp-1 lg:max-w-[90px] xl:max-w-[110px]">
              {blog.authorData.name}
            </p>
          </div>
        </div>
        <p className="line-clamp-1 text-pretty font-semibold text-gray-200 lg:line-clamp-2 lg:h-12">
          {blog.title}
        </p>
      </div>
    </div>
  );
}
