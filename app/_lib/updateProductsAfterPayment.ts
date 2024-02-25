import { baseUrl } from '../utils/baseUrl';

//updating products after payment
export async function updateProductsAfterPayment(
  products: (ProductInShoppingCart & {
    sanityProductId: string;
  })[]
): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/api/update-products-after-payment`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ productsInShoppingCart: products }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(
        'Error when updating products after payment' + ' ' + data.message
      );

      return false;
    }

    return true;
  } catch (e: any) {
    console.log('Error in updateProductsAfterPayment function' + e.message);
    return false;
  }
}
