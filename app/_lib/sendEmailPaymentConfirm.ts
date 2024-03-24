import { SanityDocument } from 'next-sanity';
import { baseUrl } from '../utils/baseUrl';

// return true if the email is successfully sent
export async function sendEmailPaymentConfirm(
  from: string,
  to: string,
  subtotal: number,
  tax: number,
  shipping: number,
  total: number,
  expectedTime: string,
  transactionNumber: string,
  products: (ProductWithImgUrl & SanityDocument & { productQuantity: number })[]
) {
  try {
    const payLoad = {
      from,
      to,
      products,
      transactionNumber,
      subtotal,
      tax,
      shipping,
      total,
      expectedTime,
    };

    const res = await fetch(`${baseUrl}/api/send-email-payment-confirm`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payLoad),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when making API call to trigger event' + data.message);
    }
  } catch (e: any) {
    console.log('Error in triggerNewProductQuantityEvent function' + e);
  }
}
