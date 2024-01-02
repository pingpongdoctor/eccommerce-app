import Image from 'next/image';
import React from 'react';

interface Props {
  avatarLink: string;
  priority?: boolean;
  avatarClassname?: string;
}

export default function Avatar({
  avatarLink,
  priority = false,
  avatarClassname,
}: Props) {
  return (
    <Image
      className={`inline-block rounded-full ${avatarClassname}`}
      src={avatarLink}
      width={32}
      height={32}
      priority={priority}
      alt="avatar"
    />
  );
}
