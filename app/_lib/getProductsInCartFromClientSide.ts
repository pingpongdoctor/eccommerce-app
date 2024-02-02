import { baseUrl } from '../utils/baseUrl';

export async function getProductsInCartFromClientSide(): Promise<
  ProductInShoppingCart[] | undefined
> {
  try {
    const res = await fetch(`${baseUrl}/api/product-shopping`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error fetching products in user cart' + ' ' + data.message);
      return undefined;
    }

    const products: ProductInShoppingCart[] = data.products;

    return products;
  } catch (e: any) {
    console.log(
      'Error in getProductsInCartFromClientSide function' + ' ' + e.message
    );
    return undefined;
  }
}
