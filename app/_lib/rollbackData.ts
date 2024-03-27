import { baseUrl } from '../utils/baseUrl';

//return true if data is successfully rolled back
export async function rollbackData(rollbackDataKey: string): Promise<boolean> {
  if (!rollbackDataKey?.trim()) {
    console.log('Error rolling back data not provided');
    return false;
  }

  try {
    const res = await fetch(
      `${baseUrl}/api/update-products-after-payment-roll-back`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ rollbackDataKey }),
      }
    );

    console.log('data is rolled back');

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
