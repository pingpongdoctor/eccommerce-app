import React from 'react';
import userAvatar from '../../public/assets/abc.avif';
import Avatar from './Avatar';
import RatingStar from './RatingStar';

export default function CustomerReview() {
  return (
    <div className="flex flex-col gap-4 py-12 last:border-none">
      <div className="flex items-center gap-4">
        <Avatar avatarClassname="size-11" avatarSrc={userAvatar} />
        <div className="flex flex-col">
          <p>Simon</p>
          <RatingStar ratingClassname="[&>div_span_svg]:h-5 [&>div_span_svg]:w-5" />
        </div>
      </div>
      <p>
        This is the bag of my dreams. I took it on my last vacation and was able
        to fit an absurd amount of snacks for the many long and hungry flights.
      </p>
    </div>
  );
}
