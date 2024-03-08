'use client';

import Image, { StaticImageData } from 'next/image';
import { solidBlureDataUrl } from '../utils/utils';

interface Props {
  avatarSrc: string | StaticImageData;
  avatarPriority?: boolean;
  avatarClassname?: string;
}

export default function AvatarClientComponent({
  avatarSrc,
  avatarPriority = false,
  avatarClassname,
}: Props) {
  return (
    <Image
      className={`inline-block size-10 rounded-full ${avatarClassname} object-cover object-center`}
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
