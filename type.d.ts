type Field = 'username' | 'email' | 'message';

interface HomePageData {
  herotext: string;
  introheading: string;
  introcontent: any;
}

interface Product {
  slug: { _type: string; current: string };
  title: 'string';
  images: any;
  detail: string;
  featured: boolean;
  price: string;
  category: 'comestic' | 'book' | 'supplement' | 'jewelry';
}

type ProductWithImgUrl = Product & {
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
