import { baseUrl } from '../utils/baseUrl';

//return true if product is successfully updated
export async function addProductToCart(
  productSlug: string,
  productQuantity: number
): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/api/product-shopping/${productSlug}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ productQuantity }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error adding product to cart' + ' ' + data.message);
      return false;
    }
    return true;
  } catch (e: any) {
    console.log('Error in addProductToCart function' + ' ' + e.message);
    return false;
  }
}
