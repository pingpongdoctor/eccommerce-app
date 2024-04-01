'use client';

import { PortableText } from '@portabletext/react';
import { builder } from '../utils/imageBuilder';
import Image from 'next/image';
import { solidBlurDataUrl } from '../utils/utils';
import { getImageDimensions } from '@sanity/asset-utils';
import { PortableTextComponents } from '@portabletext/react';

const PortableTextImage = ({
  value,
  isInline,
}: {
  value: any;
  isInline: boolean;
}) => {
  const { width, height } = getImageDimensions(value);
  return (
    <Image
      src={builder.image(value).quality(80).url()}
      className={`${
        isInline ? 'inline-block' : 'block'
      } my-8 aspect-video w-full rounded-md object-cover object-center md:my-10`}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={solidBlurDataUrl}
      alt="blog-image"
    />
  );
};

const myPortableTextComponents: PortableTextComponents | undefined = {
  types: {
    image: PortableTextImage,
  },

  block: {
    blockquote: ({ children }) => (
      <blockquote className="border-l-purple-500">{children}</blockquote>
    ),

    h4: ({ children }) => (
      <div>
        <div className="mb-8 mt-8 h-[1px] w-full bg-gray-200 md:mb-12 md:mt-12"></div>
        <h4>{children}</h4>
      </div>
    ),
  },

  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <ul className="ml-4 list-disc marker:text-gray-400">{children}</ul>
    ),
    number: ({ children }) => <ol className="ml-4 list-decimal">{children}</ol>,

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }) => (
      <ol className="m-auto text-lg">{children}</ol>
    ),
  },

  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <li className="mb-2 last:mb-0">{children}</li>,
    number: ({ children }) => <li className="mb-2 last:mb-0">{children}</li>,
    // Ex. 2: rendering custom list items
    checkmarks: ({ children }) => <li>✅ {children}</li>,
  },
};

export default function CustomizedSanityPortableTextComponent(props: {
  value: any;
}) {
  return (
    <PortableText value={props.value} components={myPortableTextComponents} />
  );
}
