import { notify } from '../_components/ReactToastifyProvider';
import { baseUrl } from '../utils/baseUrl';

export async function checkProductQuantity(
  productsInCart: ProductInShoppingCart[]
): Promise<{
  isSuccess: boolean;
  noProductsSoldOut?: boolean;
  sufficientProducts?: boolean;
}> {
  const productData: {
    productSlug: string;
    productQuantity: number;
  }[] = productsInCart.map((product: ProductInShoppingCart) => {
    return {
      productSlug: product.productSlug,
      productQuantity: product.productQuantity,
    };
  });

  try {
    const res = await fetch(`${baseUrl}/api/check-product-quantity`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ products: productData }),
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
      sufficientProducts: data.sufficientProducts,
    };
  } catch (e: any) {
    console.log('Error in checkAnyProductSoldOut function' + e.message);
    return { isSuccess: false };
  }
}
