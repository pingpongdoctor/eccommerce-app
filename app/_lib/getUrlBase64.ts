import { baseUrl } from '../utils/baseUrl';

export const getUrlBase64 = async function name(
  imageUrl: string
): Promise<string | undefined> {
  try {
    const res = await fetch(`${baseUrl}/api/get-base64?src=${imageUrl}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const errorData: { message: string } = await res.json();
      console.log('Error getting base64 url' + errorData.message);
      return undefined;
    }
    const data: { src: string } = await res.json();
    return data.src;
  } catch (e) {
    console.log('Error in getUrlBase64 function' + e);
    return undefined;
  }
};
