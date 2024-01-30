import { baseUrl } from '../utils/baseUrl';

//Return true if successfully updating products
export async function updateProductQuantityForProductsInCart(
  newQuantity: number,
  productSlug: string
): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/product-shopping/${productSlug}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ productQuantity: newQuantity }),
    });

    if (!res.ok) {
      const data = await res.json();
      console.log(
        'Error updating product quantity for products in cart' +
          ' ' +
          data.message
      );
      return false;
    }

    return true;
  } catch (e: any) {
    console.log(
      'Error in updateProductQuantityForProductsInCart function' +
        ' ' +
        e.message
    );
    return false;
  }
}
