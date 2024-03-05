import { baseUrl } from '../utils/baseUrl';

//return true if there is not product sold out
//return false if there is any product that is sold out or there is some error
export async function checkProductQuantity(
  products: {
    productSlug: string;
    productQuantity: number;
  }[]
): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/api/check-sold-out-products`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ products }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when checking sold out products' + ' ' + data.message);

      return false;
    }

    return data.noProductSoldOut;
  } catch (e: any) {
    console.log('Error in checkAnyProductSoldOut function' + e.message);
    return false;
  }
}
