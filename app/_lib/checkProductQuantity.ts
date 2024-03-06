import { notify } from '../_components/ReactToastifyProvider';
import { baseUrl } from '../utils/baseUrl';

export async function checkProductQuantity(
  products: {
    productSlug: string;
    productQuantity: number;
  }[]
): Promise<{
  isSuccess: boolean;
  noProductsSoldOut?: boolean;
  sufficientProduct?: boolean;
}> {
  try {
    const res = await fetch(`${baseUrl}/api/check-product-quantity`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ products }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when checking product quantity' + ' ' + data.message);

      return { isSuccess: false };
    }

    //check if there products that are sold out
    if (!data.noProductsSoldOut) {
      notify(
        'info',
        'some products in your cart are sold out',
        'product-sold-out'
      );

      notify(
        'info',
        'please delete sold out products from your cart',
        'delete-product'
      );
    }

    if (!data.sufficientProducts) {
      notify(
        'info',
        'some products in your cart have insufficient quantity to purchase',
        'not-sufficient-product'
      );
    }

    return {
      isSuccess: true,
      noProductsSoldOut: data.noProductsSoldOut,
      sufficientProduct: data.sufficientProduct,
    };
  } catch (e: any) {
    console.log('Error in checkAnyProductSoldOut function' + e.message);
    return { isSuccess: false };
  }
}
