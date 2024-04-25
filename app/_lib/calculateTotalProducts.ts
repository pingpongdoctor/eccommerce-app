export function calculateTotalProducts(
  products: ProductInShoppingCart[]
): number {
  try {
    const totalNumber = products
      //do not calculate products that are sold out
      .filter((product) => {
        return product.productInstock !== 0;
      })
      .reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.productQuantity,
        0
      );

    return totalNumber;
  } catch (e: any) {
    console.log('Error in calculateTotalProducts function' + e);
    return 0;
  }
}
