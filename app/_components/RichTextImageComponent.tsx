import React from 'react';
import { getImageDimensions } from '@sanity/asset-utils';
import { builder } from '../utils/imageBuilder';
import Image from 'next/image';
import { getUrlBase64 } from '../_lib/getUrlBase64';

export default async function RichTextImageComponent({
  value,
}: {
  value: any;
}) {
  const { width, height } = getImageDimensions(value);
  const imgUrl = builder
    .image(value)
    .width(800)
    .fit('max')
    .auto('format')
    .url();
  // const imgBase64Url = await getUrlBase64(imgUrl);
  return (
    <Image
      src={builder.image(value).width(800).fit('max').auto('format').url()}
      alt={value.alt || ' '}
      width={width}
      height={height}
      // placeholder="blur"
      // blurDataURL={imgBase64Url}
    />
  );
}
