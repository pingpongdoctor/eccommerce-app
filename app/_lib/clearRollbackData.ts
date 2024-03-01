import { baseUrl } from '../utils/baseUrl';

//return true if rollback data is cleared
export async function clearRollbackData(): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/api/clear-rollback-data`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when clearing rollback data' + ' ' + data.message);

      return false;
    }

    return true;
  } catch (e: any) {
    console.log('Error in clearRollbackData function' + e.message);
    return false;
  }
}
