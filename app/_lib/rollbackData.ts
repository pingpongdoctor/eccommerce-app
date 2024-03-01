import { baseUrl } from '../utils/baseUrl';

//return true if data is successfully rolled back
export async function rollbackData(): Promise<boolean> {
  try {
    const res = await fetch(
      `${baseUrl}/api/update-products-after-payment-roll-back`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when rolling back product data' + ' ' + data.message);

      return false;
    }

    return true;
  } catch (e: any) {
    console.log('Error in updateProductsAfterPayment function' + e.message);
    return false;
  }
}
