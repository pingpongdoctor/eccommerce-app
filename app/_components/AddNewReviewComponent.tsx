'use client';
import TextAreaComponent from './TextAreaComponent';
import RatingStar from './RatingStar';
import ButtonComponent from './ButtonComponent';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { postNewReview } from '../_lib/postNewReview';
import { notify } from './ReactToastifyProvider';
import { useRouter } from 'next/navigation';
import { globalStatesContext } from './GlobalStatesContext';

interface Props {
  productSlug: string;
}

export default function AddNewReviewComponent({ productSlug }: Props) {
  const { userProfile } = useContext(globalStatesContext);
  const [review, setReview] = useState<string>('');
  const [star, setStar] = useState<number | null>(null);
  null;
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const router = useRouter();

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
      notify(
        'error',
        'Please write a review and rate the product',
        'review-error'
      );
      return;
    }

    try {
      setIsDisable(true);
      const isSuccess = await postNewReview(productSlug, review, star);

      if (isSuccess) {
        notify('success', 'Thank your for your review', 'review-success');
        router.refresh();
      }
    } catch (e: any) {
      console.log(
        'Error in handleReviewContentUpdate function' + ' ' + e.message
      );
    } finally {
      setIsDisable(false);
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

      <ButtonComponent
        isDisabled={isDisable}
        buttonName="Add your review"
        animate={false}
      />
    </form>
  );
}
