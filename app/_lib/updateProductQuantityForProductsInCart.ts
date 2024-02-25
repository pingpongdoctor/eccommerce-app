import { notify } from '../_components/ReactToastifyProvider';
import { baseUrl } from '../utils/baseUrl';

//Return true if successfully updating products
export async function updateProductQuantityForProductsInCart(
  newQuantity: number,
  productSlug: string
): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/api/product-shopping/${productSlug}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ productQuantity: newQuantity }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(
        'Error updating product quantity for products in cart' +
          ' ' +
          data.message
      );
      return false;
    }

    if (data.notEnoughProducts) {
      notify(
        'info',
        'Someone else has purchased this product, making its quantity change',
        'product-quantity-change'
      );
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
