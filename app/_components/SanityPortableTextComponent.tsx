import { PortableText } from '@portabletext/react';
import { builder } from '../utils/imageBuilder';
import Image from 'next/image';
import { solidBlureDataUrl } from '../utils/utils';
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
  console.log(value);
  return (
    <Image
      src={builder.image(value).quality(80).url()}
      className={`${isInline ? 'inline-block' : 'block'}`}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={solidBlureDataUrl}
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

    h1: ({ children }) => (
      <h1 className="mb-8 text-4xl font-bold text-gray-900 md:mb-10">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="mb-6 text-3xl font-bold text-gray-900 md:mb-8">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mb-4 text-2xl font-semibold text-gray-900 md:mb-6">
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="mb-4 text-2xl font-semibold text-gray-900 md:mb-6">
        {children}
      </h4>
    ),

    p: ({ children }) => (
      <p className="text-gray-600 antialiased">{children}</p>
    ),
  },

  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <ul className="marker:text-gray-900">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="marker:text-gray-900">{children}</ol>
    ),
  },
};

export default function SanityPortableTextComponent(props: { value: any }) {
  return (
    <PortableText value={props.value} components={myPortableTextComponents} />
  );
}
