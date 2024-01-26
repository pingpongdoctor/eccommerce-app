import { baseUrl } from '../utils/baseUrl';

export async function addProductToCart(
  productSlug: string,
  productQuantity: number
): Promise<void> {
  try {
    const res = await fetch(`${baseUrl}/api/product-shopping/${productSlug}`, {
      headers: {
        'Content-Type': 'application/json',
        method: 'POST',
        body: JSON.stringify({ productQuantity }),
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error adding product to cart' + ' ' + data.message);
    }
  } catch (e: any) {
    console.log('Error adding product to cart' + ' ' + e.message);
  }
}
