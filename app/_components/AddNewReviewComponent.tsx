'use client';
import TextAreaComponent from './TextAreaComponent';
import RatingStar from './RatingStar';
import ButtonComponent from './ButtonComponent';
import { ChangeEvent, FormEvent, useState } from 'react';
import { postNewReview } from '../_lib/postNewReview';
import { notify } from './ReactToastifyProvider';
import { useUser } from '@auth0/nextjs-auth0/client';

interface Props {
  productSlug: string;
}

export default function AddNewReviewComponent({ productSlug }: Props) {
  const [review, setReview] = useState<string>('');
  const [star, setStar] = useState<number | null>(null);
  const { user } = useUser();

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

    if (!user) {
      notify('info', 'Please log in to write a review', 'login-requirement');
      return;
    }

    if (!review || !star) {
      notify('error', 'Please write a review with star rating', 'review-error');
      return;
    }

    try {
      await postNewReview(productSlug, review, star);
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
