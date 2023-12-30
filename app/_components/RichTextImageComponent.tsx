import React from 'react';
import { getImageDimensions } from '@sanity/asset-utils';
import { builder } from '../utils/imageBuilder';

export default function RichTextImageComponent({ value }: { value: any }) {
  const { width, height } = getImageDimensions(value);
  return (
    <img
      src={builder.image(value).width(800).fit('max').auto('format').url()}
      alt={value.alt || ' '}
      loading="lazy"
      style={{
        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  );
}
