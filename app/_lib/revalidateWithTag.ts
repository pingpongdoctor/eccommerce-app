import { baseUrl } from '../utils/baseUrl';

export async function revalidateWithTag(tag: string): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/api/revalidate?tag=${tag}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when revalidating data' + ' ' + data.message);

      return false;
    }

    return true;
  } catch (e: any) {
    console.log('Error in updateProductsAfterPayment function' + e);
    return false;
  }
}
