import { baseUrl } from '../utils/baseUrl';

export async function addProductToCart(
  productSlug: string,
  productQuantity: number,
  userId: number
) {
  await fetch(`${baseUrl}/api/product-shopping/${userId}`);
}
