import { baseUrl } from '../utils/baseUrl';

export const convertImageUrlHanlder = async function name(
  imageUrl: string
): Promise<string | undefined> {
  try {
    const res = await fetch(`${baseUrl}/api/convert-image?src=${imageUrl}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const errorData: { message: string } = await res.json();
      console.log('Error when getting data' + errorData.message);
      return undefined;
    }
    const data: { src: string } = await res.json();
    return data.src;
  } catch (e) {
    console.log('Error when getting data' + e);
    return undefined;
  }
};
