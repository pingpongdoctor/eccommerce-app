'use client';
import TextAreaComponent from './TextAreaComponent';
import RatingStar from './RatingStar';
import ButtonComponent from './ButtonComponent';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { postNewReview } from '../_lib/postNewReview';
import { notify } from './ReactToastifyProvider';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getUserProfile } from '../_lib/getUserProfile';
import { User } from '@prisma/client';

interface Props {
  productSlug: string;
}

export default function AddNewReviewComponent({ productSlug }: Props) {
  const [review, setReview] = useState<string>('');
  const [star, setStar] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getUserProfile().then(
        (userProfile: Omit<User, 'auth0Id'> | undefined) => {
          if (userProfile) {
            setUserId(userProfile.id);
          } else {
            setUserId(null);
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

    if (!user || !userId) {
      notify('info', 'Please log in to write a review', 'login-requirement');
      return;
    }

    if (!review || !star) {
      notify('error', 'Please write a review with star rating', 'review-error');
      return;
    }

    try {
      await postNewReview(productSlug, review, star, userId);
      notify('success', 'Thank your for your review', 'review-success');
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
      <RatingStar
        starReadonly={false}
        starChangeEventHandler={handleStarUpdate}
      />
      <ButtonComponent
        buttonClassname="text-sm h-[40px]"
        buttonName="Add your review"
        animate={false}
      />
    </form>
  );
}
