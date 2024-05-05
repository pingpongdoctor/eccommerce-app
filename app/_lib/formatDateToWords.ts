import { months } from '../utils/utils';

export function formatDateToWords(dateString: string): string {
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } catch (e: any) {
    console.log('Error in formatDateToWords function' + e);
    return '';
  }
}
