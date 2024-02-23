import Avatar from './Avatar';
import RatingStar from './RatingStar';
import { Review } from '@prisma/client';

interface Props {
  productReview: Review & { user: { name: string; imgUrl: string } };
}

export default function CustomerReview({ productReview }: Props) {
  return (
    <div className="flex flex-col gap-4 px-4 py-8 last:border-none last:pb-0 lg:first:pt-0">
      <div className="flex items-center gap-4">
        <Avatar
          avatarClassname="size-11"
          avatarSrc={productReview.user.imgUrl}
        />
        <div className="flex flex-col font-medium text-gray-700">
          <p>{productReview.user.name}</p>
          <RatingStar
            starValue={productReview.star}
            ratingClassname="[&>div_span_svg]:h-5 [&>div_span_svg]:w-5"
          />
        </div>
      </div>
      <p>{productReview.content}</p>
    </div>
  );
}
