import { StripeError } from '@stripe/stripe-js';
import { notify } from '../_components/ReactToastifyProvider';

export function handleStripeError(error: StripeError): void {
  try {
    if (error.type === 'card_error' || error.type === 'validation_error') {
      notify(
        'error',
        error.message || 'Something went wrong.',
        'card-validation-errors'
      );
    } else {
      notify('error', 'Something went wrong.', 'error');
    }
  } catch (e: any) {
    console.log('Error in handleStripeError function' + e);
  }
}
