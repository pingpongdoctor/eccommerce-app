type Categories = 'cosmetic' | 'book' | 'supplement' | 'jewelry';

type EmailTemplates = 'welcome' | 'confirm-payment';

type OrderStatus = 'prepare' | 'onTheWay' | 'done';

type TemplateEnvs = Record<EmailTemplates, string>;

type BlogsWithDetailedAuthorData = SanityBlog &
  SanityDocument & {
    authorData: SanityAuthor & SanityDocument;
  } & { imageUrl: string };

interface HomePageData {
  herotext: string;
  introheading: string;
  introcontent: any;
}

interface SanityProduct {
  slug: { _type: string; current: string };
  title: string;
  images: any;
  detail: any;
  featured: boolean;
  price: string;
  category: Categories;
  instock: number;
}

interface SanityAuthor {
  slug: { _type: string; current: string };
  name: string;
  image: any;
}

interface SanityBlog {
  slug: { _type: string; current: string };
  image: any;
  title: string;
  author: any;
  category: Categories;
  content: any;
}

interface ProductInShoppingCart {
  [index: string]: string | number | Categories;
  productSlug: string;
  productQuantity: number;
  productCategory: Categories;
  productId: number;
  productPrice: string;
  productTitle: string;
}

type ProductWithImgUrl = SanityProduct & {
  imgUrl: string;
};

interface FormInfor {
  [index: Field]: { value: string; isError: boolean };
  username: { value: string; isError: boolean };
  message: { value: string; isError: boolean };
  email: { value: string; isError: boolean };
}

interface InputBoxInfor {
  id: string;
  name: Field;
}

interface ColunmInfor {
  id: string;
  colunm: Field;
}

interface User {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface ImageInfor {
  _type: string;
  alt: string;
  _key: string;
  asset: [Object];
}

interface DropdownItemInfor {
  path: string;
  name: string;
  description: string;
  icon: React.FC<any>;
}

interface Address {
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface PurchasedProduct {
  sanitySlug: string;
  priceAtTheOrderTime: string;
  productQuantity: number;
  titleAtTheOrderTime: string;
}

interface Order {
  transactionNumber: string;
  expectedDeliveryDate: string;
  placedDate: string;
  updatedAt: string;
  tax: string;
  shipping: string;
  subtotal: string;
  status: OrderStatus;
  purchasedProducts: {
    priceAtTheOrderTime: string;
    quantity: number;
    sanitySlug: string;
    titleAtTheOrderTime: string;
    imgUrl?: string;
    detail: any;
  }[];
}
