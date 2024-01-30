export function calculateTotalProducts(
  products: ProductInShoppingCart[]
): number {
  const totalNumber = products.reduce(
    (accumulator, currentValue) => accumulator + currentValue.productQuantity,
    0
  );

  return totalNumber;
}
