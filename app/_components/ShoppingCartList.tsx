import { SanityDocument } from 'next-sanity';
import ShoppingCartItem from './ShoppingCartItem';
import { addProductImgUrls } from '../_lib/addProductImgUrls';
import product from '@/sanity/schemas/product';

interface Props {
  products: (SanityProduct & SanityDocument)[];
}

export default async function ShoppingCartList({ products }: Props) {
  //add img url to sanity documents
  const productsWithImgUrl: (ProductWithImgUrl & SanityDocument)[] =
    await addProductImgUrls(products);

  return (
    <div>
      {productsWithImgUrl.map((product: ProductWithImgUrl & SanityDocument) => (
        <ShoppingCartItem key={product._id} product={product} />
      ))}
    </div>
  );
}
