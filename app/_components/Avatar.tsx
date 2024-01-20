import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface Props {
  avatarSrc: string | StaticImageData;
  avatarPriority?: boolean;
  avatarClassname?: string;
}

export default function Avatar({
  avatarSrc,
  avatarPriority = false,
  avatarClassname,
}: Props) {
  return (
    <Image
      className={`inline-block size-7 rounded-full ${avatarClassname} object-cover object-center`}
      src={avatarSrc}
      priority={avatarPriority}
      width={30}
      height={30}
      alt="avatar"
    />
  );
}
