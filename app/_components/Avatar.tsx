import Image from 'next/image';
import React from 'react';

interface Props {
  avatarLink: string;
  avatarPriority?: boolean;
  avatarClassname?: string;
}

export default function Avatar({
  avatarLink,
  avatarPriority = false,
  avatarClassname,
}: Props) {
  return (
    <Image
      className={`inline-block size-9 rounded-full ${avatarClassname} object-cover object-center`}
      src={avatarLink}
      width={30}
      height={30}
      priority={avatarPriority}
      alt="avatar"
    />
  );
}
