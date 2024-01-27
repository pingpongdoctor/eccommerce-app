'use client';
import TextAreaComponent from './TextAreaComponent';
import RatingStar from './RatingStar';
import ButtonComponent from './ButtonComponent';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { postNewReview } from '../_lib/postNewReview';
import { notify } from './ReactToastifyProvider';
import { useRouter } from 'next/navigation';
import { getUserProfileFromClientSide } from '../_lib/getUserProfileFromClientSide';
import { User } from '@prisma/client';
import { useUser } from '@auth0/nextjs-auth0/client';

interface Props {
  productSlug: string;
}

export default function AddNewReviewComponent({ productSlug }: Props) {
  const [review, setReview] = useState<string>('');
  const [star, setStar] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState<Omit<User, 'auth0Id'> | null>(
    null
  );
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getUserProfileFromClientSide().then(
        (userData: Omit<User, 'auth0Id'> | undefined) => {
          if (userData) {
            setUserProfile(userProfile);
          }
        }
      );
    }
  }, [user]);

  const handleReviewContentUpdate = function (
    e: ChangeEvent<HTMLTextAreaElement>
  ) {
    setReview(e.target.value);
  };

  const handleStarUpdate = function (value: number) {
    setStar(value);
  };

  const handleSubmitReview = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!userProfile) {
      notify('info', 'Please log in to write a review', 'login-info');
      return;
    }

    if (!review || !star) {
      notify('error', 'Please write a review with star rating', 'review-error');
      return;
    }

    try {
      await postNewReview(productSlug, review, star);
      notify('success', 'Thank your for your review', 'review-success');
      router.refresh();
    } catch (e: any) {
      console.log(
        'Error in handleReviewContentUpdate function' + ' ' + e.message
      );
      notify('error', 'There is an error, please try again', 'submit-error');
    }
  };

  return (
    <form onSubmit={handleSubmitReview}>
      <TextAreaComponent
        textareaId="review-message"
        textareaPlaceholder="Write your review"
        textareaClassname="mb-4"
        textareaChangeEventHanlder={handleReviewContentUpdate}
      />
      <div className="mb-2 mt-8 flex items-center gap-4">
        <RatingStar
          starReadonly={false}
          starChangeEventHandler={handleStarUpdate}
        />
        <p className="mb-[4px] text-sm">(Rating this product)</p>
      </div>

      <ButtonComponent buttonName="Add your review" animate={false} />
    </form>
  );
}
