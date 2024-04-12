import { baseUrl } from '../utils/baseUrl';

//return true if successfully delete the product from the shopping cart
export async function deleteProductFromCart(
  productSlug: string
): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/api/product-shopping/${productSlug}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error adding product to cart' + ' ' + data.message);
      return false;
    }
    return true;
  } catch (e: any) {
    console.log('Error in deleteProductFromCart function' + ' ' + e);
    return false;
  }
}
