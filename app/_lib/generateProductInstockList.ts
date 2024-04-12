export function generateProductInstockList(instockValue: number): {
  id: number;
  value: number;
}[] {
  try {
    const instockList = [];
    for (let i = 1; i <= instockValue; i++) {
      instockList.push({ id: i, value: i });
    }
    return instockList;
  } catch (e: any) {
    console.log('Error in generateProductInstockList' + ' ' + e);
    return [];
  }
}
