import { baseUrl } from '../utils/baseUrl';

export async function deleteProductsInCartAfterPayment(productIds: number[]) {
  try {
    const res = await fetch(`${baseUrl}/api/clear-product-in-cart`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ productIds }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error deleting products in cart' + ' ' + data.message);

      return false;
    }

    return true;
  } catch (e: any) {
    console.log('Error in deleteProductsInCartAfterPayment function' + e);
    return false;
  }
}
