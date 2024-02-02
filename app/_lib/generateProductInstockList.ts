export function generateProductInstockList(instockValue: number): {
  id: number;
  value: number;
}[] {
  const instockList = [];
  for (let i = 1; i <= instockValue; i++) {
    instockList.push({ id: i, value: i });
  }
  return instockList;
}
