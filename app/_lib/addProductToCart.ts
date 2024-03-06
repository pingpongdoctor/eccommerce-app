import { notify } from '../_components/ReactToastifyProvider';
import { baseUrl } from '../utils/baseUrl';

//return true if product is successfully updated
export async function addProductToCart(
  productSlug: string,
  productQuantity: number
): Promise<{ isSuccess: boolean; isProductSoldOut: boolean }> {
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
      return { isSuccess: false, isProductSoldOut: false };
    }

    if (data.message === 'product is sold out') {
      notify('info', 'product is sold out', 'product-sold-out');
    } else if (data.notEnoughAvailableProduct) {
      notify(
        'info',
        `Not sufficient products to add to cart`,
        'insufficient-product'
      );
    } else {
      notify(
        'success',
        'Product has been added to your cart',
        'add-product-to-cart-success'
      );
    }
    return {
      isSuccess: true,
      isProductSoldOut: data.message === 'product is sold out',
    };
  } catch (e: any) {
    console.log('Error in addProductToCart function' + ' ' + e.message);
    return { isSuccess: false, isProductSoldOut: false };
  }
}
