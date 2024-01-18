import Image from 'next/image';
import React from 'react';
import { solidBlureDataUrl } from '../utils/utils';

interface Props {
  avatarSrc: string;
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
      placeholder="blur"
      blurDataURL={solidBlureDataUrl}
      alt="avatar"
    />
  );
}
