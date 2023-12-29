import React from 'react';
import urlBuilder from '@sanity/image-url';
import { getImageDimensions } from '@sanity/asset-utils';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export default function RichTextImageComponent({ value }: { value: any }) {
  const { width, height } = getImageDimensions(value);
  return (
    <img
      src={urlBuilder().image(value).width(800).fit('max').auto('format').url()}
      alt={value.alt || ' '}
      loading="lazy"
      style={{
        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  );
}
